import { 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

// Import AdminData type from AdminContext - use any for now to avoid circular imports
type AdminData = any;

// Firestore collection names
const COLLECTIONS = {
  ADMIN_DATA: 'adminData',
  HERO: 'hero',
  ABOUT: 'about',
  SERVICES: 'services',
  TECH_SKILLS: 'techSkills',
  PROCESS: 'process',
  TECH_STACK: 'techStack',
  REFERENCES: 'references',
  BRANDS: 'brands',
  CONTACT: 'contact',
  SETTINGS: 'settings'
} as const;

// Get document from Firestore
export const getDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      // No such document found
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

// Set/Update document in Firestore
export const setDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
    // Document successfully written
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
};

// Get all documents from a collection
export const getCollection = async (collectionName: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents: any[] = [];
    
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    
    return documents;
  } catch (error) {
    console.error("Error getting collection: ", error);
    throw error;
  }
};

// Add document to collection
export const addDocument = async (collectionName: string, data: any) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    // Document written with ID: docRef.id
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Update document
export const updateDocument = async (collectionName: string, docId: string, data: any) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// Delete document
export const deleteDocument = async (collectionName: string, docId: string) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

// Real-time listener for document changes
export const subscribeToDocument = (
  collectionName: string, 
  docId: string, 
  callback: (data: any) => void
) => {
  const docRef = doc(db, collectionName, docId);
  
  return onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      callback({ id: doc.id, ...doc.data() });
    } else {
      callback(null);
    }
  });
};

// Real-time listener for collection changes
export const subscribeToCollection = (
  collectionName: string, 
  callback: (data: any[]) => void
) => {
  const q = query(collection(db, collectionName), orderBy('id'));
  
  return onSnapshot(q, (querySnapshot) => {
    const documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    callback(documents);
  });
};

// Initialize default data
export const initializeDefaultData = async () => {
  try {
    // Check if main data already exists
    const existingData = await getDocument(COLLECTIONS.ADMIN_DATA, 'main');
    
    if (!existingData) {
      const defaultData: AdminData = {
        hero: {
          title: "MSK CODE",
          description: "Modern web teknolojileri ile yaratıcı çözümler geliştiren bir yazılım geliştiricisiyim. Kullanıcı deneyimini ön planda tutarak, işlevsel ve estetik projeler hayata geçiriyorum.",
          stats: {
            projects: "50",
            clients: "25",
            quality: "99",
            experience: "5"
          },
          statsDetails: {
            experience: { 
              icon: "📅", 
              label: "Yıllık Deneyim", 
              description: "Sektörde kazandığımız tecrübe" 
            },
            projects: { 
              icon: "🚀", 
              label: "Tamamlanan Proje", 
              description: "Başarıyla teslim edilen projeler" 
            },
            quality: { 
              icon: "😊", 
              label: "Kod Kalitesi", 
              description: "Yüksek kalite standartları" 
            },
            clients: { 
              icon: "⚡", 
              label: "Mutlu Müşteri", 
              description: "Memnun müşteri sayısı" 
            }
          }
        },
        about: {
          title: "Hakkımızda",
          description: "Teknoloji tutkusu ile yola çıktığımız bu serüvende, her proje için en iyi çözümleri sunmaya odaklanıyoruz.",
          vision: "Teknoloji ile yaşamları kolaylaştıran, değer yaratan dijital çözümler geliştirmek.",
          mission: "Müşterilerimizin hedeflerine ulaşmalarını sağlayacak yenilikçi ve kaliteli yazılım çözümleri sunmak.",
          values: [
            {
              id: 1,
              title: "Kalite",
              description: "Her projede mükemmellik arayışı",
              icon: "🎯"
            },
            {
              id: 2,
              title: "İnovasyon",
              description: "Yenilikçi teknolojiler ile öncü çözümler",
              icon: "💡"
            },
            {
              id: 3,
              title: "Güvenilirlik",
              description: "Zamanında teslimat ve sürekli destek",
              icon: "🛡️"
            },
            {
              id: 4,
              title: "Müşteri Odaklılık",
              description: "Müşteri memnuniyeti önceliğimiz",
              icon: "🤝"
            }
          ]
        },
        services: [
          {
            id: 1,
            title: "Web Geliştirme",
            description: "Modern ve responsive web siteleri",
            icon: "🌐",
            features: ["React", "Vue.js", "TypeScript", "Responsive Design"],
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          },
          {
            id: 2,
            title: "Mobil Uygulama",
            description: "Cross-platform mobil çözümler",
            icon: "📱",
            features: ["React Native", "Flutter", "iOS", "Android"],
            gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
          }
        ],
        techSkills: [
          { name: "React", level: 90, icon: "⚛️", color: "#61DAFB" },
          { name: "TypeScript", level: 85, icon: "🔷", color: "#3178C6" },
          { name: "Node.js", level: 80, icon: "🟢", color: "#339933" },
          { name: "Python", level: 75, icon: "🐍", color: "#3776AB" }
        ],
        process: [
          {
            id: 1,
            number: "01",
            title: "Analiz",
            description: "Proje gereksinimlerinin detaylı analizi",
            icon: "🔍"
          },
          {
            id: 2,
            number: "02",
            title: "Tasarım",
            description: "UI/UX tasarım ve prototip oluşturma",
            icon: "🎨"
          },
          {
            id: 3,
            number: "03",
            title: "Geliştirme",
            description: "Modern teknolojilerle kodlama",
            icon: "💻"
          },
          {
            id: 4,
            number: "04",
            title: "Test & Deploy",
            description: "Kapsamlı test ve canlıya alma",
            icon: "🚀"
          }
        ],
        workProcess: [
          {
            id: 1,
            step: 1,
            title: "Analiz & Planlama",
            description: "Proje gereksinimlerinin detaylı analizi",
            icon: "🔍"
          },
          {
            id: 2,
            step: 2,
            title: "Tasarım & Prototip",
            description: "UI/UX tasarım ve prototip oluşturma",
            icon: "🎨"
          },
          {
            id: 3,
            step: 3,
            title: "Geliştirme",
            description: "Modern teknolojilerle kodlama",
            icon: "💻"
          },
          {
            id: 4,
            step: 4,
            title: "Test & Deploy",
            description: "Kapsamlı test ve canlıya alma",
            icon: "🚀"
          }
        ],
        techStack: {
          frontend: {
            title: "Frontend",
            icon: "🎨",
            technologies: ["React", "Vue.js", "TypeScript", "Tailwind CSS"]
          },
          backend: {
            title: "Backend",
            icon: "⚙️",
            technologies: ["Node.js", "Express", "Python", "FastAPI"]
          }
        },
        references: [
          {
            id: 1,
            title: "E-Ticaret Platformu",
            client: "ABC Şirketi",
            industry: "E-Ticaret",
            description: "Modern e-ticaret çözümü",
            image: "",
            technologies: ["React", "Node.js", "MongoDB"],
            status: "Tamamlandı",
            category: "E-Ticaret",
            gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          }
        ],
        brands: {
          title: "Güvenilir Markaların Tercihi",
          subtitle: "Başarılı markalarla güçlü iş birlikleri",
          list: [
            {
              id: 1,
              name: "TechCorp",
              category: "Teknoloji",
              description: "Kurumsal yazılım çözümleri",
              image: "/images/brands/techcorp.png",
              status: "completed",
              launchDate: "2023-01-01",
              technologies: ["React", "Node.js"],
              features: ["Dashboard", "Analytics"],
              gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            }
          ]
        },
        contact: {
          email: "info@mskcode.com",
          phone: "+90 555 123 45 67",
          address: "İstanbul, Türkiye",
          whatsapp: "905551234567",
          icons: {
            email: "📧",
            phone: "📞",
            whatsapp: "💬",
            address: "📍"
          },
          socialMedia: {
            linkedin: "https://linkedin.com/in/mskcode",
            github: "https://github.com/mskcode",
            instagram: "https://instagram.com/mskcode",
            twitter: ""
          },
          socialMediaIcons: {
            linkedin: "💼",
            github: "💻",
            twitter: "🐦",
            instagram: "📸"
          }
        },
        contactHero: {
          title: "İletişime Geçin",
          subtitle: "Projeleriniz için birlikte çalışalım",
          features: ["24 Saat İçinde Yanıt", "Ücretsiz Danışmanlık", "Hızlı Çözümler"]
        },
        contactCta: {
          title: "Projenizi Hayata Geçirelim!",
          description: "Fikirlerinizi modern teknolojilerle buluşturalım. Size özel çözümler geliştirmek için sabırsızlanıyoruz.",
          buttonText: "Hemen Başlayalım",
          buttonUrl: "mailto:info@mskod.com",
          buttonIcon: "🚀",
          features: [
            {
              icon: "💡",
              text: "Ücretsiz Konseptual Tasarım"
            },
            {
              icon: "📋",
              text: "Detaylı Proje Planlaması"
            },
            {
              icon: "🔧",
              text: "Teknik Danışmanlık"
            }
          ]
        },
        cta: {
          title: "Projenizi Hayata Geçirelim!",
          description: "Modern teknolojiler ve güncel best practices ile projenizi en yüksek kalitede teslim etmeye odaklıyım. Sürekli öğrenme ve gelişim anlayışıyla her projede mükemmel sonuçlar hedefliyorum.",
          buttonText: "Ücretsiz Konsültasyon",
          features: [
            "Modern Teknolojiler",
            "Yaratıcı Çözümler", 
            "Sürekli Gelişim"
          ],
          referencesCta: {
            title: "References",
            description: "See our past projects",
            buttonText: "View References",
            features: ["Client Testimonials", "Industry Recognition"]
          }
        },
        projectCategories: ["Tümü", "E-Ticaret", "Kurumsal", "Mobil", "SaaS"],
        brandCategories: ["Teknoloji", "E-Ticaret", "Fintech", "Eğitim"],
        footer: {
          company: {
            name: "MSK CODE",
            description: "Modern web teknolojileri ile yaratıcı çözümler geliştiren yazılım şirketi."
          },
          quickLinks: [
            { name: "Ana Sayfa", path: "/" },
            { name: "Hakkımızda", path: "/about" },
            { name: "Hizmetler", path: "/services" },
            { name: "Referanslar", path: "/references" },
            { name: "İletişim", path: "/contact" }
          ],
          contact: {
            email: "info@mskcode.com",
            phone: "+90 555 123 45 67",
            address: "İstanbul, Türkiye"
          },
          socialMedia: {
            linkedin: "https://linkedin.com/in/mskcode",
            github: "https://github.com/mskcode",
            instagram: "https://instagram.com/mskcode",
            twitter: ""
          },
          copyright: "© 2024 MSK CODE. Tüm hakları saklıdır."
        },
        seo: {
          metaTitle: "MSK CODE - Modern Web Teknolojileri",
          metaDescription: "Modern web teknolojileri ile yaratıcı çözümler geliştiren yazılım şirketi. React, Node.js, Python ve daha fazlası.",
          keywords: ["web geliştirme", "react", "nodejs", "python", "yazılım", "istanbul"],
          openGraph: {
            title: "MSK CODE - Modern Web Teknolojileri",
            description: "Modern web teknolojileri ile yaratıcı çözümler geliştiren yazılım şirketi.",
            image: "/images/mskod-logo.jpeg",
            url: "https://mskcode.com"
          },
          twitterCard: {
            title: "MSK CODE - Modern Web Teknolojileri",
            description: "Modern web teknolojileri ile yaratıcı çözümler geliştiren yazılım şirketi.",
            image: "/images/mskod-logo.jpeg"
          },
          favicon: "/favicon.ico"
        }
      };

      await setDocument(COLLECTIONS.ADMIN_DATA, 'main', defaultData);
      console.log("Default data initialized!");
      return defaultData;
    }
    
    // Remove id field from Firestore document and type assert safely
    const { id: _id, ...dataWithoutId } = existingData;
    return dataWithoutId as AdminData;
  } catch (error) {
    console.error("Error initializing default data: ", error);
    throw error;
  }
};

// Get main admin data
export const getAdminData = async (): Promise<AdminData> => {
  try {
    const data = await getDocument(COLLECTIONS.ADMIN_DATA, 'main');
    if (data) {
      // Remove id field from Firestore document and type assert safely
      const { id: _id, ...dataWithoutId } = data;
      return dataWithoutId as AdminData;
    } else {
      // If no data exists, initialize with defaults
      return await initializeDefaultData();
    }
  } catch (error) {
    console.error("Error getting admin data: ", error);
    throw error;
  }
};

// Update admin data
export const updateAdminData = async (data: Partial<AdminData>) => {
  try {
    await setDocument(COLLECTIONS.ADMIN_DATA, 'main', data);
    console.log("Admin data updated successfully!");
  } catch (error) {
    console.error("Error updating admin data: ", error);
    throw error;
  }
};

export { COLLECTIONS }; 