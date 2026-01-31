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

export const clientReviews = [
    {
        id: 1,
        name: 'Emily Johnson',
        position: 'Marketing Director at GreenLeaf',
        img: 'assets/review1.png',
        review:
            'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
    },
    {
        id: 2,
        name: 'Mark Rogers',
        position: 'Founder of TechGear Shop',
        img: 'assets/review2.png',
        review:
            'Adrian’s expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He’s a true professional! Fantastic work.',
    },
    {
        id: 3,
        name: 'John Dohsas',
        position: 'Project Manager at UrbanTech ',
        img: 'assets/review3.png',
        review:
            'I can’t say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.',
    },
    {
        id: 4,
        name: 'Ether Smith',
        position: 'CEO of BrightStar Enterprises',
        img: 'assets/review4.png',
        review:
            'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
    },
];

export const myProjects = [
    {
        title: 'WanderTales- Travelling Guidance Platform',
        desc: 'WanderTales a traveling journal website where people will share their journey stories and reviews and tips of a place where they visited, what they faced or what if someone wants to go there needs there they can add good company or hotel reviews too',
        subdue:
            'Built as a unique Software-as-a-Service app with MongoDB, Tailwind CSS, Express.js, React.js and Node.js, WanderTales is designed for optimal performance and scalability.',
        href: 'https://www.youtube.com/watch?v=zfAb95tJvZQ',
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
                path: 'assets/tailwindcss.png',
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
        title: ' Brisc App',
        desc: 'Brain Tumor Classification Segmentation Project,We built a multitask deep learning pipeline using U-Net and evaluated it against Attention U-Net for segmentation.',
        subdue: "We used Multitask U-Net (Segmentation + Classification) model a standard U-Net backbone with Segmentation head which predicts tumor mask and Classification head which predicts tumor type (4-class) Secondly We used Attention U-Net (Segmentation only) Model used as a segmentation baseline to compare performance.",
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
                name: 'Pytorch',
                path: 'assets/pytorch.png',
            },

        ],
    },
    {
        title: 'SAW - A Game of Your Survival',
        desc: 'A Project that is inspired from the saw movie but the game is different than SAW. In this game as a player I have to answer questions that appears in the tv, If the player give the wrong answer he have to cut one of his limb or else the villian will kill him and gave will be over. If the player give right answer then one of the lock from the key box will open itself. The player have to do this 4 times and theres a timelimit to answer the questions. The game will end as successful if the player can get the key and open the door lock.',
        subdue:
            'A 3D Game using OPENGL Library of Python based on the Movie SAW.',
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
                path: 'assets/opengl.png',
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

export const workExperiences = [

];