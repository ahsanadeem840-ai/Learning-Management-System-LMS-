export const quizzesData = {
  "nextjs15_m1_quiz": {
    courseId: "nextjs15",
    lessonTitle: "Module 1 Quiz & Assessment",
    title: "Next.js 15 Foundations Assessment",
    description: "Validate your knowledge on Next.js 15 development setup, routing fundamentals, and React Server Components (RSC) vs Client Components.",
    timeLimit: 600, // 10 minutes in seconds
    passingScore: 70, // 70% to pass
    questions: [
      {
        id: "q1",
        type: "single",
        question: "Which directive must be placed at the top of a file to designate a component as a Client Component in Next.js 15?",
        options: [
          "\"use server\"",
          "\"use client\"",
          "\"use client-side\"",
          "\"use dynamic\""
        ],
        answer: 1, // index of option
        explanation: "The \"use client\" directive is the standard React convention adopted by Next.js to demarcate client-side boundary files, allowing hook lifecycle execution like useState and useEffect."
      },
      {
        id: "q2",
        type: "multiple",
        question: "Select all correct route segment folder name conventions in Next.js 15: (Select all that apply)",
        options: [
          "[courseId] - defines a dynamic segment parameter",
          "(dashboard) - creates a route group to skip pathname segmenting",
          "@modal - defines a parallel slot segment for modal layouts",
          "_utilities - designates a private folder ignored by routing compiler"
        ],
        answer: [0, 1, 2, 3], // all are correct
        explanation: "Next.js App Router utilizes [id] for dynamic parameters, (group) for grouping without path inclusion, @slot for parallel routes, and _name prefix for private code separation."
      },
      {
        id: "q3",
        type: "text",
        question: "Write the file convention name (including the .js or .jsx extension) used to define custom error boundaries in a route segment.",
        answer: "error.js", // we will check case-insensitively and also match .js, .tsx, .ts, etc.
        acceptedAnswers: ["error.js", "error.tsx", "error.jsx", "error.ts"],
        explanation: "The error.js/error.tsx file convention automatically defines a React Error Boundary wrapping the underlying segment component trees."
      },
      {
        id: "q4",
        type: "sequence",
        question: "Sequence the execution flow of a Next.js Server Action with validation, from user interaction to DOM revalidation:",
        items: [
          "The database is updated, and revalidatePath is invoked on the server.",
          "The user triggers submit on the form wrapper element.",
          "Next.js transitions action state and posts payload to the server.",
          "The client UI re-renders with the fresh data and form fields reset.",
          "The server decrypts and parses data against the Zod schema."
        ],
        correctSequence: [1, 2, 4, 0, 3], // user triggers -> nextjs transitions -> server validates -> db updates -> ui rerenders
        explanation: "The lifecycle begins at client interaction (1), is sent via POST payload (2), validated on the server using schemas (4), executes database mutation & triggers revalidation cache checks (0), and finally updates/re-renders the active DOM nodes (3)."
      }
    ]
  },
  "uiuxfigma_m1_quiz": {
    courseId: "uiuxfigma",
    lessonTitle: "Module 1 UX Principles Quiz & Assessment",
    title: "UI/UX Design Principles Assessment",
    description: "Validate your proficiency in visual hierarchy, auto-layouts, typography variables, and color token definition models.",
    timeLimit: 450, // 7.5 minutes in seconds
    passingScore: 75,
    questions: [
      {
        id: "uq1",
        type: "single",
        question: "What is the recommended baseline grid scaling increment used by modern digital interface designers for layouts, margins, and spacing bounds?",
        options: [
          "5px spacing scale",
          "8px spacing scale",
          "10px spacing scale",
          "12px spacing scale"
        ],
        answer: 1,
        explanation: "The 8px grid scaling system guarantees visual balance and scales perfectly across standard display ratios (1.5x, 2x, 3x) without decimal truncation."
      },
      {
        id: "uq2",
        type: "multiple",
        question: "Which properties are core ingredients of high-fidelity typography scales in UI systems? (Select all that apply)",
        options: [
          "Line height (leading)",
          "Letter spacing (tracking)",
          "Font weight (intensity)",
          "Auto-layout padding"
        ],
        answer: [0, 1, 2],
        explanation: "Typography scales are defined by font-family, font-weight, line-height, and tracking. Auto-layout padding is a spacing attribute, not typography."
      },
      {
        id: "uq3",
        type: "text",
        question: "What CSS filter or property is commonly applied to card backgrounds to achieve the glassmorphic frosted appearance in UIs?",
        answer: "backdrop-filter",
        acceptedAnswers: ["backdrop-filter", "backdrop filter", "backdrop-blur", "backdrop blur"],
        explanation: "The CSS backdrop-filter property (specifically backdrop-filter: blur(px)) applies graphic blur rules on background pixels behind the transparent element."
      },
      {
        id: "uq4",
        type: "sequence",
        question: "Sequence the hierarchy of typography headings from highest emphasis to lowest emphasis:",
        items: [
          "Body Text Small",
          "Display Title (Large Banner)",
          "Section Subtitle",
          "Curriculum Header (H3)"
        ],
        correctSequence: [1, 2, 3, 0], // Display -> Section Subtitle -> Curriculum Header -> Body Text Small
        explanation: "Visual hierarchy mandates display title at maximum size/weight (1), followed by section subtitles (2), curriculum header subsets (3), and body captions at minimal scales (0)."
      }
    ]
  },
  "introai_m1_quiz": {
    courseId: "introai",
    lessonTitle: "Module 1 Mathematics Quiz & Assessment",
    title: "Linear Algebra & Probability Assessment",
    description: "Verify your conceptual understanding of tensor dot products, derivatives, and cross-entropy loss equations.",
    timeLimit: 900, // 15 minutes
    passingScore: 70,
    questions: [
      {
        id: "aq1",
        type: "single",
        question: "In neural computing, what loss function is most commonly utilized for multi-class classification model training?",
        options: [
          "Mean Squared Error (MSE)",
          "Categorical Cross-Entropy Loss",
          "Binary Cross-Entropy Loss",
          "Huber Loss"
        ],
        answer: 1,
        explanation: "Categorical Cross-Entropy Loss measures the performance of a classification model whose output is a probability value between 0 and 1, specifically for multi-class predictions."
      },
      {
        id: "aq2",
        type: "multiple",
        question: "Which operations are valid vector/matrix tensor calculations? (Select all that apply)",
        options: [
          "Dot Product of matching dimensions",
          "Hadamard (element-wise) Product",
          "Matrix multiplication of shape (3,2) * (2,4)",
          "Matrix multiplication of shape (3,2) * (3,2)"
        ],
        answer: [0, 1, 2],
        explanation: "Dot products and Hadamard products are mathematically defined. Shape multiplication requires inner dimensions to match (e.g. 2 matches 2). Multiplying (3,2) * (3,2) is invalid."
      },
      {
        id: "aq3",
        type: "text",
        question: "What activation function is commonly used at the output layer of multi-class classification neural networks to output a probability distribution?",
        answer: "softmax",
        acceptedAnswers: ["softmax", "soft-max", "softmax function"],
        explanation: "The softmax activation function scales vectors of real numbers into probability distributions where all components sum to 1."
      },
      {
        id: "aq4",
        type: "sequence",
        question: "Sequence the forward-pass and backpropagation optimization loop of a neural network:",
        items: [
          "Compute derivative gradients of the loss with respect to weights",
          "Feed features forward through linear weights and activations",
          "Calculate the scalar cross-entropy error loss value",
          "Update synaptic weights using gradient descent subtract scalars"
        ],
        correctSequence: [1, 2, 0, 3], // forward feed -> compute loss -> get gradients -> update weights
        explanation: "The sequence starts with forward propagation (1), error metrics computation (2), chain rule derivative gradient backprop (0), and parameter weight adjustment iterations (3)."
      }
    ]
  }
};
