import CommonRustImage from '@/assets/common-rust.jpg'
import GLSImage from '@/assets/gray-leaf-spot.jpg'
import NCBImage from '@/assets/northern-leaf-blight.jpg'
import PestDamageImage from '@/assets/pest-damage.jpg'

export interface Disease {
  id: string
  name: string
  image: string
  characteristic: string[]
  solution: string[] | Record<string, string[]>
  category: string
  references: string[]
}

export const diseases: Disease[] = [
  {
    id: 'common-rust',
    name: 'Karat Daun',
    image: CommonRustImage,
    characteristic: [
      'Karat daun (<i>Common Rust</i>) disebabkan oleh pathogen P. sorghi lebih banyak menyerang (ditemukan) pada dataran sedang-tinggi, sementara P. polysora lebih banyak menyerang (ditemukan) pada dataran rendah.',
      'Adanya bisul (pustules) pada kedua permukaan daun bagian atas dan bawah dengan warna cokelat kemerahan tersebar pada permukaan daun dan berubah warna menjadi hitam kecokelatan setelah teliospora berkembang.',
      'Pada tanaman dewasa tingkat serangan lebih parah, daun menjadi kering sehingga mematikan tanaman.',
    ],
    solution: {
      "Penanaman Varietas Tahan": [
        'Penggunaan varietas tahan terhadap penyakit karat merupakan salah satu strategi yang paling efektif dalam pengendaliannya di lapangan',
        'Varietas tahan terhadap penyakit karat di area pertanaman dapat menekan produksi uredeospora, sehingga mengurangi sumber inokulum awal dan keadaan ini memperlambat penularannya di lapangan.',
        'Meskipun begitu, varietas tahan dianjurkan tidak ditanam terus-menerus karena dapat meningkatkan tekanan seleksi strain karat dan memungkinkan berkembangnya strain baru. Apabila strain baru yang lebih virulen suatu patogen sudah dominan. keadaan tersebut dapat mempercepat patahnya ketahanan suatu varietas'
      ],
      "Penggiliran Tanaman": [
        'Melakukan pergiliran tanaman dengan tanaman dari famili berbeda.',
        'Bertujuan memutus siklus hidup patogen karena kehilangan tanaman inang.',
        'Membantu mengurangi penyebaran patogen di lahan.',
      ],
      "Penggunaan Fungisida": [
        'Fungisida digunakan apabila intensitas serangan sudah cukup tinggi.',
        'Fungisida berbahan aktif mancozeb efektif menekan dinamika penyakit karat di lapangan, serta teridentifikasi dapat menaikkan produksi secara nyata dibanding dengan tanpa perlakuan.',
        'Adapun jenis bahan aktif fungisida lainnya seperti Pyraclostrobin, Azoxystrobin, Chloratholonil (Echo R 720 dan R 90 DF), produk dagang Mancozeb, Dithane M45, Dithane DF Rainshield, Manzate, dan Pencozeb dengan sifat aksi pada inang sebagai pencegahan sedangkan dengan bahan aktif Propiconazole, Tebuconazole, Azoxystrobin dan propiconazole serta triploxystrobin dan propiconazole dengan sifat aksi pada inang sebagai pengendalian.',
      ],
    },
    category: 'Fungal',
    references: [
      'Sulaiman, A. A., Djufry, F., Bahrun, A. H., & Nur, A. (2024). Budi Daya Jagung Terstandar (I. Muttaqien & E. Kustant (eds.)). Pertanian Press. https://repository.pertanian.go.id/items/4385cf3e-a525-48e4-89c2-a088cf480ac6',
    ],
  },
  {
    id: 'gray-leaf-spot',
    name: 'Bercak Daun',
    image: GLSImage,
    characteristic: [
      'Bercak daun (<i>Gray Leaf Spot</i>) disebabkan oleh jamur Cercospora zeae-maydis. Gejala awal berupa lesi atau bercak yang awalnya berwarna kuning. Bercak kemudian berubah menjadi cokelat muda (tan) hingga abu-abu. Lesi berbentuk memanjang dan sempit mengikuti arah tulang daun.',
      'Penyakit umumnya mulai berkembang dari daun bagian bawah kemudian menyebar ke daun yang lebih atas.',
      'Penyakit berkembang lebih cepat pada kondisi lingkungan yang lembap dan hangat serta pada lahan dengan riwayat penanaman jagung berulang. Patogen penyebab penyakit dapat bertahan hidup pada residu tanaman jagung yang tertinggal di lahan sehingga menjadi sumber infeksi pada musim tanam berikutnya.',
      'Serangan penyakit menyebabkan peningkatan luas area daun yang terinfeksi sehingga mengurangi kemampuan daun untuk melakukan fotosintesis. Semakin besar persentase daun yang terinfeksi, semakin besar potensi kehilangan hasil panen.',
    ],
    solution: {
      Kultur: [
        'Gunakan varietas jagung yang memiliki ketahanan tinggi terhadap gray leaf spot',
        'Lakukan rotasi tanaman minimal 2 tahun, terutama pada sistem tanpa olah tanah',
        'Buang sisa tanaman jagung dari permukaan lahan untuk mengurangi sumber infeksi',
        'Gunakan pengolahan tanah yang mempercepat penguraian sisa tanaman jagung',
        'Hindari pertanaman jagung berulang tanpa rotasi',
      ],
      Mekanik: [
        'Lakukan pengamatan sejak tahap pertumbuhan V10-V14 (10-14 daun telah terbentuk) untuk menilai tingkat keparahan penyakit',
        'Evaluasi keparahan penyakit sebelum memutuskan untuk melakukan aplikasi fungisida',
      ],
      Kimiawi: [
        'Aplikasikan fungisida saat fase VT hingga R1 (tasseling hingga awal silk) untuk melindungi tanaman dari kehilangan hasil',
        'Gunakan fungisida berbahan aktif strobilurin atau campuran strobilurin/triazol yang terbukti efektif',
        'Ikuti petunjuk label untuk waktu aplikasi, volume, dan spesifikasi alat yang tepat',
      ],
    },
    category: 'Fungal',
    references: [
      'Bayer Crop Science United States. (2023, July 11). Gray Leaf Spot in Corn. Bayer Crop Science United States. https://www.cropscience.bayer.us/articles/bayer/gray-leaf-spot-in-corn',
    ],
  },
  {
    id: 'northern-corn-leaf-blight',
    name: 'Hawar Daun',
    image: NCBImage,
    characteristic: [
      'Hawar daun (<i>Northern Corn Leaf Blight</i>) disebabkan oleh Exserohilum turcicum. Dapat menyebabkan kehilangan hasil jagung akibat infeksi penyakit hawar daun mencapai 70%.',
      'Muncul bercak kecil berbentuk oval, bercak kemudian memanjang elips seperti cerutu dan berkembang menjadi nekrotik yang disebut hawar.',
      'Warnanya hijau keabu-abuan atau coklat. Panjang hawar 2,5-15 cm.',
      'Bercak muncul pertama kali pada daun terbawah, kemudian berkembang kebagian atas.',
      'Infeksi berat dapat mengakibatkan tanaman cepat mati atau mengering. Cendawan ini tidak menginfeksi tongkol atau kelobot.',
      'Cendawan ini dapat bertahan hidup dalam bentuk miselium dorman pada daun atau pada sisa tanaman di lapangan.',
    ],
    solution: [
      'Penggunaan fungisida berbahan aktif mancozeb dan dithiocarbamate.',
      'Pemusnahan seluruh bagian tanaman yang terinfeksi bercak daun sampai ke akarnya.',
      'Penggunaan varietas tahan penyakit hawar daun',
    ],
    category: 'Fungal',
    references: [
      'Ramija, K. EL, Harahap, A. T., Harahap, S. M., Romaito, S., Siregar, I. H., Agriawat, D., Nurmalia, Sitindaon, S. H., Listiawati, Hasibuan, M., Handayani, T., Hutapea, N., Zulhaidah, L., Nurzannah, S. E., & Aisyah, L. (2024). Penerapan Good Agricultural Practices (GAP) Jagung di Sumatera Utara. Balai Penerapan Standar Instrumen Pertanian Sumatera Utara. https://repository.pertanian.go.id/items/9f373d27-ff20-4d89-ac04-b52c54489a8b',
    ],
  },
  {
    id: 'pest-damage',
    name: 'Kerusakan Hama',
    image: PestDamageImage,
    characteristic: [
      'Kerusakan hama (<i>Pest Damage</i>) biasanya disebabkan oleh fall armyworm yang menyerang bagian tanaman jagung, terutama daun, batang, bunga, buah, dan titik tumbuh.',
      'Larva instar awal memakan lapisan permukaan daun sehingga muncul goresan atau bercak transparan memanjang (window pane damage) pada daun. Larva instar lanjut memakan jaringan daun lebih dalam hingga membentuk lubang-lubang tidak beraturan pada daun.',
      'Larva dapat menyerang titik tumbuh (whorl) sehingga daun muda yang membuka menunjukkan kerusakan yang semakin jelas. Larva dapat menggerek dan memakan bagian batang maupun bunga jagung.',
      'Serangan berat menyebabkan daun hampir habis dimakan dan hanya menyisakan tulang daun serta batang tanaman. Pucuk tanaman dapat patah akibat aktivitas makan larva.',
      'Di sekitar titik serangan sering ditemukan kotoran larva (frass) berwarna cokelat menyerupai serbuk gergaji.',
      'Tingkat kerusakan dapat sangat tinggi, bahkan pada tanaman muda dilaporkan mencapai 100% kerusakan.',
      'Intensitas serangan yang tinggi berpengaruh langsung terhadap penurunan bobot tongkol dan hasil panen jagung.',
    ],
    solution: {
      Kultur: [
        'Gunakan benih sehat dan varietas yang moderat hingga tahan terhadap serangan hama, seperti Bisi 2 dan Bisi 99',
        'Atur waktu tanam yang tepat dan lakukan penanaman secara serempak',
        'Terapkan sistem tanam polikultur atau tumpangsari dengan kacang-kacangan',
        'Lakukan rotasi tanaman dengan bunga matahari atau kacang-kacangan untuk memutus siklus hidup hama',
        'Lakukan pengolahan tanah yang tepat untuk merusak habitat pupa di dalam tanah',
        'Terapkan teknik push-pull dengan menanam Desmodium sp. sebagai tanaman penolak dan tanaman perangkap',
      ],
      Mekanik: [
        'Kumpulkan dan musnahkan stadia telur, larva, atau kepompong yang ditemukan di lapangan',
      ],
      Feromon: [
        'Memasang perangkap feromon untuk monitoring populasi dan penangkapan massal ngengat jantan.',
        'Menggunakan teknik mating disruption (pengacauan perkawinan) untuk menekan reproduksi populasi hama.',
      ],
      Hayati: [
        'Manfaatkan parasitoid seperti Telenomus remus, Chelonus insularis, Cotesia marginiventris, dan Trichogramma spp.',
        'Gunakan predator alami seperti Doru luteipes, Euborillia annulipes, dan kumbang kepik',
        'Aplikasikan cendawan entomopatogen Beauveria bassiana dan Metarhizium anisopliae yang dapat menyebabkan mortalitas larva hingga 92-96%',
        'Gunakan virus Spodoptera frugiperda Multycapsid Nuclear Polyhedro Virus (SfMNPV)',
        'Gunakan bakteri Bacillus thuringiensis yang dapat menyebabkan mortalitas hingga 100% pada konsentrasi 10%',
      ],
      Kimiawi: [
        'Aplikasikan insektisida berdasarkan ambang batas ekonomi: 5% bibit terpotong atau 20% tanaman berumur kurang dari 30 HST terserang',
        'Gunakan insektisida berbahan aktif emamektin benzoat yang terbukti efektif dan selektif terhadap parasitoid Trichogramma sp.',
        'Gunakan insektisida golongan IGR (Insect Growth Regulator) seperti flufenuron dan triflumuron untuk membunuh ulat grayak secara selektif',
        'Gunakan insektisida golongan diamida antranilik seperti khlorantraniliprol dan tetrakhlorantraniliprol',
        'Rotasi bahan aktif insektisida perlu dilakukan untuk mencegah terjadinya resistensi hama.',
      ],
    },
    category: 'Pest',
    references: [
      'Anintyas, D., Safitri, K. N. I., Kusumawati, E., Masoyogie, K., Dirmawati, S. R., Aeny, T. N., & Suharjo, R. (2024). Spodoptera frugiperda: Hama utama pada tanaman jagung dan strategi pengendaliannya. Jurnal Proteksi Agrikultura, 1(2). https://doi.org/10.23960/jpa.2166-80',
      'Sulaiman, A. A., Djufry, F., Bahrun, A. H., & Nur, A. (2024). Budi Daya Jagung Terstandar (I. Muttaqien & E. Kustant (eds.)). Pertanian Press. https://repository.pertanian.go.id/items/4385cf3e-a525-48e4-89c2-a088cf480ac6',
    ],
  },
]

/**
 * Maps a class_name string from the server response to a Disease object.
 * Returns undefined if the class_name is "Healthy" or not found.
 */
export function getDiseaseByClassName(className: string): Disease | undefined {
  const mapping: Record<string, string> = {
    'Karat Daun': 'common-rust',
    'Bercak Daun': 'gray-leaf-spot',
    'Hawar Daun': 'northern-corn-leaf-blight',
    'Kerusakan Hama': 'pest-damage',
  }

  const diseaseId = mapping[className]
  if (!diseaseId) return undefined
  return diseases.find((d) => d.id === diseaseId)
}
