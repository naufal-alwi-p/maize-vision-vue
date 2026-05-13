<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import ProgressSpinner from 'primevue/progressspinner'
import Select from 'primevue/select'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import DetectionResult from '@/components/DetectionResult.vue'
import type { DetectionResultData } from '@/components/DetectionResult.vue'

const detectionResult = ref<DetectionResultData | null>(null)

const fileInputRef = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const isAnalyzing = ref(false)
const analyzeState = ref<'idle' | 'success' | 'error'>('idle')

const cameraOpen = ref(false)
const cameraCaptured = ref(false)
const cameraError = ref('')
const isCameraReady = ref(false)

const videoRef = ref<HTMLVideoElement | null>(null)
const captureCanvasRef = ref<HTMLCanvasElement | null>(null)
const streamRef = ref<MediaStream | null>(null)
const activeTrack = ref<MediaStreamTrack | null>(null)

const facingMode = ref<'user' | 'environment'>('environment')
const torchAvailable = ref(false)
const torchOn = ref(false)
const capturedPreviewUrl = ref<string | null>(null)
const capturedFile = ref<File | null>(null)
const videoInputCount = ref(0)
const previewFrameRef = ref<HTMLDivElement | null>(null)
const previewCropSize = ref(0)

const modelOptions = ref([
    {
        name: 'ConvNeXt (Best)',
        value: 'convnext',
    },
    {
        name: 'MaxViT',
        value: 'maxvit',
    },
])
const selectedModel = ref<'convnext' | 'maxvit'>('convnext')

const hasPreview = computed(() => Boolean(previewUrl.value))
const canSwitchCamera = computed(() => videoInputCount.value > 1)
const previewCropStyle = computed(() => {
    const size = previewCropSize.value
    return size ? { width: `${size}px`, height: `${size}px` } : {}
})
const analyzeMessage = computed(() => {
    // if (analyzeState.value === 'success') return 'Image submitted for analysis.'
    if (analyzeState.value === 'error') return 'Failed to submit image. Try again.'
    return ''
})

const openFileDialog = () => {
    fileInputRef.value?.click()
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const fileError = ref<string | null>(null)

const isAcceptedFile = (file: File): boolean => ACCEPTED_TYPES.includes(file.type)

const validateFile = (file: File): boolean => {
    fileError.value = null
    if (!isAcceptedFile(file)) {
        fileError.value = 'Format file tidak didukung. Gunakan JPG, PNG, atau WEBP.'
        return false
    }
    if (file.size > MAX_FILE_SIZE) {
        fileError.value = `Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(1)}MB). Maksimal 10MB.`
        return false
    }
    return true
}

const setPreviewFromFile = (file: File) => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
    analyzeState.value = 'idle'
}

const onFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    if (!file || !validateFile(file)) {
        if (input) input.value = ''
        return
    }
    setPreviewFromFile(file)
}

const onDropFile = (event: DragEvent) => {
    const file = event.dataTransfer?.files?.[0]
    if (!file || !validateFile(file)) return
    setPreviewFromFile(file)
}

const clearPreview = () => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
    selectedFile.value = null
    analyzeState.value = 'idle'
}

const openCamera = () => {
    cameraOpen.value = true
    cameraCaptured.value = false
    cameraError.value = ''
    if (capturedPreviewUrl.value) {
        URL.revokeObjectURL(capturedPreviewUrl.value)
        capturedPreviewUrl.value = null
    }
    capturedFile.value = null
}

const closeCamera = () => {
    cameraOpen.value = false
    cameraCaptured.value = false
    stopCamera()
}

type TorchCapabilities = MediaTrackCapabilities & { torch?: boolean }
let previewResizeObserver: ResizeObserver | null = null

const refreshCameraDevices = async () => {
    if (!navigator.mediaDevices?.enumerateDevices) {
        videoInputCount.value = 0
        return
    }
    try {
        const devices = await navigator.mediaDevices.enumerateDevices()
        videoInputCount.value = devices.filter((device) => device.kind === 'videoinput').length
    } catch (error) {
        videoInputCount.value = 0
    }
}

const updatePreviewCropSize = () => {
    const frame = previewFrameRef.value
    if (!frame) return
    previewCropSize.value = Math.min(frame.clientWidth, frame.clientHeight)
}

const startCamera = async () => {
    cameraError.value = ''
    isCameraReady.value = false
    torchAvailable.value = false
    torchOn.value = false

    try {
        await nextTick()
        if (!navigator.mediaDevices?.getUserMedia) {
            throw new Error('Camera API not supported')
        }

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: { ideal: facingMode.value },
            },
            audio: false,
        })

        streamRef.value = stream
        const track = stream.getVideoTracks()[0]
        if (!track) throw new Error('No video track available')
        activeTrack.value = track

        if (videoRef.value) {
            videoRef.value.srcObject = stream
            await videoRef.value.play()
        }

        const capabilities = track?.getCapabilities?.() as TorchCapabilities | undefined
        torchAvailable.value = Boolean(capabilities?.torch)
        await refreshCameraDevices()
        isCameraReady.value = true
    } catch (error) {
        cameraError.value = 'Tidak dapat mengakses kamera. Periksa izin kamera di browser.'
        stopCamera()
    }
}

const stopCamera = () => {
    streamRef.value?.getTracks().forEach((track) => track.stop())
    streamRef.value = null
    activeTrack.value = null
    if (videoRef.value) videoRef.value.srcObject = null
    isCameraReady.value = false
    torchAvailable.value = false
    torchOn.value = false
}

const capturePhoto = async () => {
    if (!videoRef.value) return
    const video = videoRef.value
    const canvas = captureCanvasRef.value ?? document.createElement('canvas')
    captureCanvasRef.value = canvas

    // Crop center square from the video feed for 1:1 output
    const vw = video.videoWidth || 1280
    const vh = video.videoHeight || 720
    const cropSize = Math.min(vw, vh)
    const sx = (vw - cropSize) / 2
    const sy = (vh - cropSize) / 2

    canvas.width = cropSize
    canvas.height = cropSize

    const context = canvas.getContext('2d')
    if (!context) return
    context.drawImage(video, sx, sy, cropSize, cropSize, 0, 0, cropSize, cropSize)

    const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', 0.92)
    )
    if (!blob) return

    if (capturedPreviewUrl.value) URL.revokeObjectURL(capturedPreviewUrl.value)
    const file = new File([blob], 'camera_capture.jpg', { type: blob.type || 'image/jpeg' })
    capturedFile.value = file
    capturedPreviewUrl.value = URL.createObjectURL(blob)
    cameraCaptured.value = true
    video.pause()
}

const retakePhoto = () => {
    cameraCaptured.value = false
    if (capturedPreviewUrl.value) {
        URL.revokeObjectURL(capturedPreviewUrl.value)
        capturedPreviewUrl.value = null
    }
    capturedFile.value = null
    videoRef.value?.play()
}

const useCapturedPhoto = () => {
    if (capturedFile.value) {
        setPreviewFromFile(capturedFile.value)
    }
    analyzeState.value = 'idle'
    closeCamera()
}

const switchCamera = async () => {
    cameraCaptured.value = false
    if (capturedPreviewUrl.value) {
        URL.revokeObjectURL(capturedPreviewUrl.value)
        capturedPreviewUrl.value = null
    }
    capturedFile.value = null
    facingMode.value = facingMode.value === 'user' ? 'environment' : 'user'
    stopCamera()
    await startCamera()
}

const toggleTorch = async () => {
    if (!activeTrack.value || !torchAvailable.value) return
    const nextState = !torchOn.value
    try {
        await activeTrack.value.applyConstraints({
            advanced: [{ torch: nextState } as unknown as MediaTrackConstraintSet],
        })
        torchOn.value = nextState
    } catch (error) {
        torchOn.value = false
    }
}

const analyzeImage = async () => {
    if (!previewUrl.value || isAnalyzing.value) return
    isAnalyzing.value = true
    analyzeState.value = 'idle'

    try {
        const endpoint = 'http://127.0.0.1:8000/predict'
        if (selectedFile.value) {
            const formData = new FormData()
            formData.append('image', selectedFile.value)
            formData.append('model', selectedModel.value)
            const response = await fetch(endpoint, { method: 'POST', body: formData })
            if (!response.ok) throw new Error('Upload failed')
            const result: DetectionResultData = await response.json()
            detectionResult.value = result
        } else {
            throw new Error("Image file is required")
        }

        analyzeState.value = 'success'
    } catch (error) {
        analyzeState.value = 'error'
    } finally {
        isAnalyzing.value = false
    }
}

const handleBackToDetection = () => {
    detectionResult.value = null
    clearPreview()
    if (fileInputRef.value) fileInputRef.value.value = ''
    selectedModel.value = 'convnext'
    fileError.value = null
}

onBeforeUnmount(() => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    if (capturedPreviewUrl.value) URL.revokeObjectURL(capturedPreviewUrl.value)
    previewResizeObserver?.disconnect()
    previewResizeObserver = null
    stopCamera()
})

watch(cameraOpen, async (isOpen) => {
    if (isOpen) {
        await startCamera()
    } else {
        stopCamera()
    }
})

watch(previewUrl, async (value) => {
    if (value) {
        await nextTick()
        updatePreviewCropSize()
        previewResizeObserver?.disconnect()
        if (typeof ResizeObserver !== 'undefined' && previewFrameRef.value) {
            previewResizeObserver = new ResizeObserver(updatePreviewCropSize)
            previewResizeObserver.observe(previewFrameRef.value)
        }
    } else {
        previewResizeObserver?.disconnect()
        previewResizeObserver = null
        previewCropSize.value = 0
    }
})
</script>

<template>
    <DetectionResult
        v-if="detectionResult"
        :result="detectionResult"
        @back="handleBackToDetection"
    />
    <main v-else class="bg-[#f7f8f3] text-[#27411a]">
        <section class="mx-auto w-[min(1080px,calc(100%-1rem))] px-0 pt-7 pb-16">
            <div class="text-center">
                <h1 class="text-[clamp(1.8rem,3vw,2.4rem)] font-semibold tracking-[-0.04em] text-[#2f4a1f]">
                    Corn Leaf Disease Detection
                </h1>
                <!-- <p class="mx-auto mt-2 max-w-xl text-[#6d7965]">
                    Upload an image of a corn leaf to identify potential diseases
                </p> -->
            </div>

            <div class="mx-auto mt-5 max-w-3xl space-y-8">
                <!-- Inline Camera Mode -->
                <Card
                    v-if="cameraOpen"
                    class="overflow-hidden rounded-3xl border border-[#e3ead9] bg-[#0f1b0a] shadow-[0_20px_45px_rgba(63,83,48,0.12)]"
                    :pt="{ body: { class: 'p-0' } }"
                >
                    <template #content>
                        <div class="p-6 sm:p-8">
                            <!-- Header -->
                            <div class="mb-5 flex items-center justify-between">
                                <div class="flex items-center gap-3 text-white">
                                    <i class="pi pi-camera"></i>
                                    <span class="text-lg font-semibold">Kamera Deteksi</span>
                                </div>
                                <Button
                                    icon="pi pi-times"
                                    rounded
                                    text
                                    class="text-white/70 hover:text-white"
                                    aria-label="Close camera"
                                    @click="closeCamera"
                                />
                            </div>

                            <!-- Camera viewfinder (1:1 square) -->
                            <div class="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-[#1a2413]" style="aspect-ratio: 1 / 1;">
                                <video
                                    ref="videoRef"
                                    playsinline
                                    muted
                                    class="absolute inset-0 h-full w-full object-cover"
                                ></video>

                                <!-- Loading / Error overlay -->
                                <div
                                    v-if="!isCameraReady"
                                    class="absolute inset-0 flex items-center justify-center bg-[#0f1b0a]/70 text-sm text-[#d8e3cf]"
                                >
                                    {{ cameraError || 'Menyalakan kamera...' }}
                                </div>

                                <!-- Captured preview -->
                                <img
                                    v-if="cameraCaptured && capturedPreviewUrl"
                                    :src="capturedPreviewUrl"
                                    alt="Captured preview"
                                    class="absolute inset-0 h-full w-full object-cover"
                                />

                                <!-- Captured badge -->
                                <div
                                    v-if="cameraCaptured"
                                    class="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-[#2f4a1f] px-4 py-1 text-xs font-semibold text-white"
                                >
                                    Foto Berhasil Diambil
                                </div>

                                <!-- 1:1 guide corners -->
                                <div v-if="!cameraCaptured && isCameraReady" class="pointer-events-none absolute inset-3">
                                    <div class="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-white/50 rounded-tl-md"></div>
                                    <div class="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-white/50 rounded-tr-md"></div>
                                    <div class="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-white/50 rounded-bl-md"></div>
                                    <div class="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-white/50 rounded-br-md"></div>
                                </div>
                            </div>

                            <p class="mt-4 text-center text-sm text-[#9bb08b]">
                                Arahkan kamera ke daun jagung yang ingin dideteksi
                            </p>

                            <!-- Controls: capture mode -->
                            <div v-if="!cameraCaptured" class="mt-5 flex items-center justify-between">
                                <Button
                                    icon="pi pi-sync"
                                    rounded
                                    outlined
                                    class="border-[#355223] text-[#c6d3bf]"
                                    aria-label="Switch camera"
                                    :disabled="!canSwitchCamera || !isCameraReady"
                                    @click="switchCamera"
                                />
                                <button
                                    class="group relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white/40 hover:border-white/60 active:border-white/60 transition-colors"
                                    :disabled="!isCameraReady"
                                    @click="capturePhoto"
                                >
                                    <span class="h-10 w-10 rounded-full border-4 border-white group-hover:bg-white group-active:bg-white transition-colors"></span>
                                </button>
                                <Button
                                    icon="pi pi-bolt"
                                    rounded
                                    outlined
                                    class="border-[#355223] text-[#c6d3bf]"
                                    aria-label="Flash"
                                    :disabled="!torchAvailable"
                                    :severity="torchOn ? 'success' : undefined"
                                    @click="toggleTorch"
                                />
                            </div>

                            <!-- Controls: review mode -->
                            <div v-else class="mt-5 flex flex-wrap gap-4">
                                <Button
                                    label="Ambil Ulang"
                                    icon="pi pi-refresh"
                                    severity="secondary"
                                    outlined
                                    class="flex-1 rounded-xl border-[#2f4a1f] text-[#f2f6ed]"
                                    @click="retakePhoto"
                                />
                                <Button
                                    label="Gunakan Foto"
                                    icon="pi pi-check"
                                    class="flex-1 rounded-xl border-0 bg-[#2f4a1f] text-white hover:bg-[#263d18]"
                                    @click="useCapturedPhoto"
                                />
                            </div>
                        </div>
                    </template>
                </Card>

                <!-- Upload form (hidden when camera is active) -->
                <Card
                    v-else-if="!hasPreview"
                    class="overflow-hidden rounded-3xl border border-[#e3ead9] bg-white/95 shadow-[0_20px_45px_rgba(63,83,48,0.12)]"
                    :pt="{ body: { class: 'p-0' } }"
                >
                    <template #content>
                        <div class="p-6 sm:p-8">
                            <div
                                class="flex min-h-55 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#95ad80] bg-[#f6f9f1] px-6 text-center"
                                role="button"
                                tabindex="0"
                                @click="openFileDialog"
                                @keydown.enter.prevent="openFileDialog"
                                @keydown.space.prevent="openFileDialog"
                                @dragover.prevent
                                @drop.prevent="onDropFile"
                            >
                                <span class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#e5efe0] text-[#4f6d2f]">
                                    <i class="pi pi-cloud-upload text-2xl"></i>
                                </span>
                                <h3 class="text-lg font-semibold text-[#3c5726]">Drag and drop your corn leaf image here</h3>
                                <p class="mt-1 text-sm text-[#7a8772]">or click to browse files</p>
                                <p class="mt-3 text-xs text-[#9aa593]">Supported formats: JPG, PNG, WEBP up to 10MB</p>
                            </div>

                            <input
                                ref="fileInputRef"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                class="hidden"
                                @change="onFileChange"
                            />

                            <div class="mt-6 flex flex-wrap gap-4 max-sm:flex-col">
                                <Button
                                    label="Upload from Device"
                                    icon="pi pi-folder-open"
                                    severity="secondary"
                                    outlined
                                    class="flex-1 rounded-xl border-[#2f4a1f] text-[#2f4a1f]"
                                    @click="openFileDialog"
                                />
                                <Button
                                    label="Use Camera"
                                    icon="pi pi-camera"
                                    class="flex-1 rounded-xl border-0 bg-[#2f4a1f] text-white hover:bg-[#263d18]"
                                    @click="openCamera"
                                />
                            </div>

                            <div
                                v-if="fileError"
                                class="mt-4 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                                role="alert"
                            >
                                <i class="pi pi-exclamation-circle text-red-500"></i>
                                <span class="flex-1">{{ fileError }}</span>
                                <button
                                    class="ml-auto text-red-400 hover:text-red-600"
                                    aria-label="Dismiss"
                                    @click="fileError = null"
                                >
                                    <i class="pi pi-times text-xs"></i>
                                </button>
                            </div>
                        </div>
                    </template>
                </Card>

                <Card
                    v-else
                    class="overflow-hidden rounded-3xl border border-[#e3ead9] bg-white/95 shadow-[0_20px_45px_rgba(63,83,48,0.12)]"
                    :pt="{ body: { class: 'p-0' } }"
                >
                    <template #content>
                        <div class="p-6 sm:p-8">
                            <div ref="previewFrameRef" class="relative overflow-hidden rounded-2xl bg-[#f2f6ed]">
                                <img
                                    v-if="previewUrl"
                                    :src="previewUrl"
                                    alt="Selected corn leaf"
                                    class="w-full"
                                />
                                <div v-if="previewUrl" class="pointer-events-none absolute inset-0">
                                    <div
                                        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_0_9999px_rgba(6,10,5,0.6)]"
                                        :style="previewCropStyle"
                                    ></div>
                                    <div
                                        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-white/70"
                                        :style="previewCropStyle"
                                    ></div>
                                    <!-- <div
                                        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                        :style="previewCropStyle"
                                    >
                                        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-[#0b1408]/70 px-3 py-1 text-[0.7rem] font-semibold text-white">
                                            Area diproses 1:1
                                        </div>
                                    </div> -->
                                </div>
                                <div
                                    v-if="isAnalyzing"
                                    class="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#101a0b]/65 text-white"
                                >
                                    <ProgressSpinner
                                        style="width: 48px; height: 48px"
                                        strokeWidth="4"
                                    />
                                    <span class="text-sm font-medium">Analyzing image...</span>
                                </div>
                            </div>

                            <div class="mt-4 flex items-center justify-between rounded-xl border border-[#e1e9d7] bg-[#f9fbf6] px-4 py-3">
                                <div class="flex items-center gap-3 text-sm text-[#556150]">
                                    <i class="pi pi-image text-[#6e7b65]"></i>
                                    <span>{{ selectedFile?.name || 'camera_capture.jpg' }}</span>
                                </div>
                                <Button
                                    icon="pi pi-times"
                                    severity="danger"
                                    rounded
                                    text
                                    aria-label="Remove image"
                                    @click="clearPreview"
                                />
                            </div>

                            <Button
                                label="Analyze Image with AI"
                                icon="pi pi-sparkles"
                                class="mt-5 w-full rounded-xl border-0 bg-[#2f4a1f] text-white hover:bg-[#263d18]"
                                :disabled="isAnalyzing"
                                @click="analyzeImage"
                            />

                            <InputGroup class="mt-5 max-w-fit mx-auto md:mx-0">
                                <InputGroupAddon>
                                    <i class="pi pi-microchip-ai"></i>
                                </InputGroupAddon>
                                <Select
                                    v-model="selectedModel"
                                    :options="modelOptions"
                                    optionLabel="name"
                                    optionValue="value"
                                    size="small"
                                />
                            </InputGroup>

                            <p v-if="analyzeMessage" class="mt-3 text-center text-sm text-red-500" aria-live="polite">
                                {{ analyzeMessage }}
                            </p>
                        </div>
                    </template>
                </Card>

                <Card
                    class="overflow-hidden rounded-3xl border border-[#e3ead9] bg-white/95 shadow-[0_16px_35px_rgba(63,83,48,0.1)]"
                    :pt="{ body: { class: 'p-0' } }"
                >
                    <template #content>
                        <div class="p-6 sm:p-8">
                            <div class="flex items-center gap-2 text-[#3f5a29]">
                                <i class="pi pi-lightbulb"></i>
                                <h3 class="text-base font-semibold">Tips for Best Results</h3>
                            </div>
                            <ul class="mt-4 space-y-3 text-sm text-[#6d7965]">
                                <li class="flex items-start gap-2">
                                    <i class="pi pi-check-circle text-[#5b7a36] mt-0.5"></i>
                                    <span>Take photos in good lighting conditions for clearer images.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="pi pi-check-circle text-[#5b7a36] mt-0.5"></i>
                                    <span>Focus on the affected area of the leaf showing disease symptoms.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="pi pi-check-circle text-[#5b7a36] mt-0.5"></i>
                                    <span>Ensure the leaf fills most of the frame for accurate detection.</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <i class="pi pi-check-circle text-[#5b7a36] mt-0.5"></i>
                                    <span>Avoid blurry images. Hold your camera steady when capturing.</span>
                                </li>
                            </ul>
                        </div>
                    </template>
                </Card>
            </div>
        </section>

    </main>
</template>