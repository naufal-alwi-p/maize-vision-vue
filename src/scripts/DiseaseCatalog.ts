import CommonRustImage from '@/assets/common-rust.jpg'
import GLSImage from '@/assets/gray-leaf-spot.jpg'
import NCBImage from '@/assets/northern-leaf-blight.jpg'
import PestDamageImage from '@/assets/pest-damage.jpg'

export interface Disease {
  id: string
  name: string
  image: string
  characteristic: string
  solution: string
  category: string
}

export const diseases: Disease[] = [
  {
    id: 'common-rust',
    name: 'Common Rust',
    image: CommonRustImage,
    characteristic:
      'Fungal disease with small, circular to elongate brown pustules on both leaf surfaces. Pustules appear in scattered patterns and may coalesce as the disease progresses.',
    solution:
      'Plant resistant varieties, ensure good crop sanitation, use fungicide sprays during early stages of infection, and maintain adequate plant spacing.',
    category: 'Fungal',
  },
  {
    id: 'gray-leaf-spot',
    name: 'Gray Leaf Spot',
    image: GLSImage,
    characteristic:
      'Rectangular gray or tan lesions with distinct parallel edges between leaf veins. Lesions may have a dark brown border and often appear in linear patterns on the leaf.',
    solution:
      'Use disease-resistant hybrids, practice crop rotation to reduce pathogen survival, remove crop residue, ensure proper spacing, and apply fungicides when conditions are favorable.',
    category: 'Fungal',
  },
  {
    id: 'northern-corn-leaf-blight',
    name: 'Northern Corn Leaf Blight',
    image: NCBImage,
    characteristic:
      'Fungal disease causing long, elliptical gray-green lesions on corn leaves. Lesions appear with a tan or brown center and may have a yellow halo. Typically starts on lower leaves and progresses upward.',
    solution:
      'Use resistant corn hybrids, practice crop rotation, remove infected crop debris, apply fungicide if needed, and ensure proper spacing for air circulation.',
    category: 'Fungal',
  },
  {
    id: 'pest-damage',
    name: 'Pest Damage',
    image: PestDamageImage,
    characteristic:
      'Physical damage to corn leaves caused by insect feeding, including irregular holes, leaf edges being consumed, or skeletonized patterns. Common pests include armyworms, corn borers, and grasshoppers.',
    solution:
      'Monitor fields regularly for pest presence, use integrated pest management strategies, apply appropriate insecticides if thresholds are exceeded, and plant resistant varieties when available.',
    category: 'Pest',
  },
]

/**
 * Maps a class_name string from the server response to a Disease object.
 * Returns undefined if the class_name is "Healthy" or not found.
 */
export function getDiseaseByClassName(className: string): Disease | undefined {
  const mapping: Record<string, string> = {
    'Common_Rust': 'common-rust',
    'Gray_Leaf_Spot': 'gray-leaf-spot',
    'Blight': 'northern-corn-leaf-blight',
    'Pest_Damage': 'pest-damage',
  }

  const diseaseId = mapping[className]
  if (!diseaseId) return undefined
  return diseases.find((d) => d.id === diseaseId)
}
