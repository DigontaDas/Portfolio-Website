export const navLinks = [
    {
        id: 1,
        name: 'Home',
        href: '#home',
    },
    {
        id: 2,
        name: 'About',
        href: '#about',
    },
    {
        id: 3,
        name: 'Projects',
        href: '#projects',
    },
    {
        id: 4,
        name: 'Contact',
        href: '#contact',
    },
];



export const myProjects = [
    {
        title: 'Efficient 3D Tiled CNN Architecture',
        desc: 'Undergraduate Thesis (Team Lead) on Volumetric CT Segmentation for Coronary Artery Stenosis Detection. Evaluated on 121 MRI and 160 CT scans (3.5 GB/scan) self-collected from Ibrahim Cardiac & Bangladesh Medical hospitals, benchmarked against ImageCAS.',
        subdue:
            'Designed volumetric tiling for memory-efficient processing of heavy 3.5 GB scans. Engineered Hounsfield Unit (HU) normalization and Hybrid Combo Loss (Dice + BCE) to completely resolve empty-mask collapse, producing clinician-ready stenosis risk scores.',
        href: 'https://github.com/DigontaDas/Efficient-3D-Tiled-CNN-Architecture.git',
        texture: null,
        logo: '/assets/project-logo1.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight1.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.png',
            },
            {
                id: 2,
                name: 'PyTorch',
                path: '/assets/pytorch.png',
            },
        ],
    },
    {
        title: 'WanderTales - Travelling Guidance Platform',
        desc: 'WanderTales is a traveling journal and guidance platform where explorers share their journeys, route tips, authentic reviews, and hotel recommendations for destinations worldwide.',
        subdue:
            'Built as a full-featured Software-as-a-Service application with MongoDB, Tailwind CSS, Express.js, React.js, and Node.js, engineered for high performance, smooth responsiveness, and scalability.',
        href: 'https://youtu.be/gI9KdtDwfIk',
        texture: '/textures/project/Project-1.mp4',
        logo: '/assets/project-logo1.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight1.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'TailwindCSS',
                path: '/assets/tailwindcss.png',
            },
            {
                id: 3,
                name: 'Expressjs',
                path: '/assets/expressjs.svg',
            },
            {
                id: 4,
                name: 'MongoDB',
                path: '/assets/mongodb.png',
            },
        ],
    },
    {
        title: 'Brisc App - Brain Tumor Classification & Segmentation',
        desc: 'Medical imaging deep learning pipeline built for high-precision brain tumor classification and anatomical boundary segmentation across multi-modal MRI scans.',
        subdue:
            'Engineered a multitask U-Net (Segmentation + Classification) predicting tumor masks and tumor types (4-class), systematically benchmarked against an Attention U-Net baseline.',
        href: 'https://youtu.be/5b8iKaokxJg',
        texture: '/textures/project/Project-2.mp4',
        logo: '/assets/project-logo2.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.png',
            },
            {
                id: 2,
                name: 'PyTorch',
                path: '/assets/pytorch.png',
            },
        ],
    },
    {
        title: 'SAW - A Game of Your Survival',
        desc: 'An atmospheric 3D survival horror game developed with Python and OpenGL inspired by SAW. Players must answer puzzles appearing on a monitor within strict time limits to unlock the key box and escape.',
        subdue:
            'Crafted with custom 3D OpenGL rendering shaders, interactive timed puzzle state machines, sound triggers, and dynamic camera movements.',
        href: 'https://youtu.be/OSRNRSt9G9M',
        texture: '/textures/project/Project-3.mp4',
        logo: '/assets/project-logo3.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.png',
            },
            {
                id: 2,
                name: 'OpenGL',
                path: '/assets/opengl.png',
            },
        ],
    },
    {
        title: 'MaSheba AI - Offline Maternal Health Platform',
        desc: 'Infinity AI BuildFest 2026 Finalist. An offline-first maternal health platform engineered to serve 3M+ expecting mothers and 60K+ Community Health Workers across rural Bangladesh with zero cloud reliance.',
        subdue:
            'XGBoost risk model exported to ONNX (1 MB) achieving sub-200ms on-device inference on Android 8+; outbox-first SQLite sync stress-tested at 50 concurrent events with 100% deduplication; cascading Bangla AI chat with 6-stage safety filters.',
        href: 'https://github.com/DigontaDas/MaSheba--AI.git',
        texture: null,
        logo: '/assets/project-logo2.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'Python',
                path: '/assets/python.png',
            },
        ],
    },
    {
        title: 'Hybrid Model on Efficient SE-Net',
        desc: 'Lightweight hybrid MobileNetV2 + Squeeze-and-Excitation attention architecture at only 2.2M parameters for cross-vendor cardiac MRI segmentation.',
        subdue:
            'Demonstrated remarkable zero-shot cross-vendor generalization: DSC 0.8712 on ACDC and DSC 0.7512 on unseen M&Ms dataset, shrinking the cross-vendor clinical generalization gap to just 0.12.',
        href: 'https://github.com/DigontaDas/Hybrid-Model-on-Efficient-SE-Net.git',
        texture: null,
        logo: '/assets/project-logo3.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.png',
            },
            {
                id: 2,
                name: 'PyTorch',
                path: '/assets/pytorch.png',
            },
        ],
    },
    {
        title: 'Clarity - B2B Supply Chain Finance Platform',
        desc: 'Enterprise B2B supply chain financing portal featuring an invoice marketplace, digital payment locks, real-time discounting calculators, and corporate KYB business verification.',
        subdue:
            'Engineered Express.js routes with locking mechanisms to prevent duplicated transactions; architected KYB vault for compliance data; integrated Supabase for real-time dashboard analytics.',
        href: 'https://github.com/DigontaDas/Clarity.git',
        texture: null,
        logo: '/assets/project-logo1.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight4.png',
        tags: [
            {
                id: 1,
                name: 'React.js',
                path: '/assets/react.svg',
            },
            {
                id: 2,
                name: 'Expressjs',
                path: '/assets/expressjs.svg',
            },
        ],
    },
    {
        title: 'Movie Recommendation AI - RAG Pipeline',
        desc: 'Full Retrieval-Augmented Generation (RAG) recommendation system operating over 3,000+ movies using Sentence Transformers vector embeddings and local LLM re-ranking.',
        subdue:
            'Employs ChromaDB vector store paired with Ollama (LLaMA) for context-aware personalized query matching, orchestrated through a modular FastAPI backend and React frontend at zero API costs.',
        href: 'https://github.com/DigontaDas/Movie-Recommendation-AI.git',
        texture: null,
        logo: '/assets/project-logo3.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.png',
            },
            {
                id: 2,
                name: 'React.js',
                path: '/assets/react.svg',
            },
        ],
    },
    {
        title: 'Skin Disease AI',
        desc: 'Deep convolutional neural network for multi-class dermatological condition classification, addressing subtle inter-class visual nuances across dermoscopic imagery.',
        subdue:
            'Trained on extensive clinical datasets with customized data augmentation pipelines; delivers high-sensitivity detection for malignant melanoma and pigmented lesions suitable for point-of-care screening.',
        href: 'https://github.com/DigontaDas/Skin_Disease_AI.git',
        texture: null,
        logo: '/assets/project-logo2.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight4.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.png',
            },
            {
                id: 2,
                name: 'PyTorch',
                path: '/assets/pytorch.png',
            },
        ],
    },
    {
        title: 'OT Pre-Surgical Safety Gate',
        desc: 'Mission-critical operating theater safety automation system enforcing pre-surgical checks, surgical site verification, and patient consent protocol integrity.',
        subdue:
            'Implements a rigid protocol state machine preventing pre-incision surgical checklist bypass, containerized with FastAPI and immutable event audit logs.',
        href: 'https://github.com/DigontaDas/OT-Pre-Surgical-Safety-Gate',
        texture: null,
        logo: '/assets/project-logo1.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight1.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.png',
            },
        ],
    },
    {
        title: 'REMEDY - Smart Healthcare Triage Engine',
        desc: 'Intelligent medical diagnosis advisory platform that translates patient symptom descriptions into prioritized triage levels and recommended clinical interventions.',
        subdue:
            'Calculates multi-variable symptom severity scoring with contraindication warnings, built on a containerized FastAPI microservices backend with medical knowledge graph indexing.',
        href: 'https://github.com/DigontaDas/REMEDY.git',
        texture: null,
        logo: '/assets/project-logo2.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.png',
            },
        ],
    },
    {
        title: 'Dhaka Tesla Pool',
        desc: 'High-throughput distributed backend ride-matching and route-clustering engine designed for dense urban electric vehicle pooling and fleet optimization.',
        subdue:
            'Dynamic passenger pairing algorithms optimizing travel detours and vehicle seating; battery state-of-charge routing heuristics to manage charging station turnaround.',
        href: 'https://github.com/DigontaDas/Dhaka-Tesla-Pool.git',
        texture: null,
        logo: '/assets/project-logo3.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            {
                id: 1,
                name: 'Python',
                path: '/assets/python.png',
            },
        ],
    },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
    return {
        deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
        deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
        cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
        reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
        ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
        targetPosition: isSmall
            ? [-5, -5, -10]   // Was -10 (Moved up by 5)
            : isMobile
                ? [-9, -5, -10]   // Was -10 (Moved up by 5)
                : isTablet
                    ? [-11, -3, -10]  // Was -7  (Moved up by 4)
                    : [-13, -7, -10],
    };
};


