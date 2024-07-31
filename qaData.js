
  

// const qaData = [
//     {
//       id: 1,
//       question: "What is React Native?",
//       answer: "React Native is a framework for building native apps using React."
//     },
//     {
//       id: 2,
//       question: "What is Expo?",
//       answer: "Expo is a set of tools and services built around React Native to help you develop, build, and deploy apps quickly."
//     },
//     {
//       id: 3,
//       question: "How do I use state in React?",
//       answer: "You can use the useState hook to manage state in functional components."
//     },
//     {
//       id: 4,
//       question: "What is JSX?",
//       answer: "JSX is a syntax extension for JavaScript that looks similar to XML or HTML and is used with React to describe UI components."
//     }
//   ];
  
//   export default qaData;
  

const qaData = [
  {
    id: 1,
    question: "What is React Native?",
    answer: "React Native is a framework for building native apps using React.",
    subquestions: [
      "Why should I use React Native?",
      "How do I set up React Native environment?",
    ]
  },
  {
    id: 2,
    question: "What is Expo?",
    answer: "Expo is a set of tools and services built around React Native to help you develop, build, and deploy apps quickly.",
    subquestions: [
      "What are the advantages of using Expo?",
      "How do I start a new project with Expo?"
    ]
  },
  {
    id: 3,
    question: "How do I use state in React?",
    answer: "You can use the useState hook to manage state in functional components.",
    subquestions: [
      "What are the other state management options in React?",
      "How do I lift state up in React?"
    ]
  },
  {
    id: 4,
    question: "What is JSX?",
    answer: "JSX is a syntax extension for JavaScript that looks similar to XML or HTML and is used with React to describe UI components.",
    subquestions: [
      "Why use JSX instead of plain JavaScript?",
      "Is JSX mandatory in React development?"
    ]
  }
];

export default qaData;
