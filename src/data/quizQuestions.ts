export interface Question {
  id: number;
  question: string;
  code?: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: 'java' | 'oops' | 'dsa';
  explanation: string;
}

export const quizQuestions: Question[] = [
  // Java Basics - Easy
  {
    id: 1,
    question: "Which keyword is used to define a constant in Java?",
    options: ["const", "final", "static", "constant"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'java',
    explanation: "The 'final' keyword is used to declare constants in Java."
  },
  {
    id: 2,
    question: "What is the default value of an int variable in Java?",
    options: ["null", "0", "undefined", "-1"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'java',
    explanation: "The default value of int in Java is 0."
  },
  {
    id: 3,
    question: "Which method is the entry point of a Java program?",
    options: ["start()", "run()", "main()", "init()"],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'java',
    explanation: "The main() method is the entry point of any Java application."
  },

  // OOPs - Easy
  {
    id: 4,
    question: "Which OOP concept allows a class to inherit properties from another class?",
    options: ["Encapsulation", "Polymorphism", "Inheritance", "Abstraction"],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'oops',
    explanation: "Inheritance allows a class to inherit properties and methods from a parent class."
  },
  {
    id: 5,
    question: "What does encapsulation mean in OOP?",
    options: ["Multiple inheritance", "Data hiding", "Method overloading", "Code reuse"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'oops',
    explanation: "Encapsulation is the bundling of data with methods that operate on that data, hiding internal details."
  },

  // DSA - Easy
  {
    id: 6,
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(n)", "O(log n)", "O(1)", "O(n²)"],
    correctAnswer: 2,
    difficulty: 'easy',
    category: 'dsa',
    explanation: "Array access by index is O(1) - constant time operation."
  },
  {
    id: 7,
    question: "Which data structure follows LIFO (Last In First Out)?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: 1,
    difficulty: 'easy',
    category: 'dsa',
    explanation: "Stack follows LIFO - the last element added is the first to be removed."
  },

  // Java - Medium
  {
    id: 8,
    question: "What will be the output of this code?",
    code: `String s1 = "Hello";
String s2 = new String("Hello");
System.out.println(s1 == s2);`,
    options: ["true", "false", "Compilation error", "Runtime error"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'java',
    explanation: "== compares references, not values. s1 and s2 point to different objects."
  },
  {
    id: 9,
    question: "What is the output of this code?",
    code: `int[] arr = {1, 2, 3};
System.out.println(arr.length);`,
    options: ["2", "3", "4", "Compilation error"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'java',
    explanation: "The array has 3 elements, so arr.length returns 3."
  },

  // OOPs - Medium
  {
    id: 10,
    question: "What is method overloading?",
    options: [
      "Methods with same name but different parameters",
      "Methods with different names",
      "Overriding parent methods",
      "Using static methods"
    ],
    correctAnswer: 0,
    difficulty: 'medium',
    category: 'oops',
    explanation: "Method overloading allows multiple methods with the same name but different parameters."
  },
  {
    id: 11,
    question: "Which keyword is used to prevent a class from being inherited?",
    options: ["static", "private", "final", "abstract"],
    correctAnswer: 2,
    difficulty: 'medium',
    category: 'oops',
    explanation: "A final class cannot be extended (inherited)."
  },
  {
    id: 12,
    question: "What is the difference between abstract class and interface?",
    options: [
      "No difference",
      "Abstract class can have constructors, interface cannot",
      "Interface can have constructors",
      "Abstract class cannot have methods"
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'oops',
    explanation: "Abstract classes can have constructors and concrete methods; interfaces cannot have constructors."
  },

  // DSA - Medium
  {
    id: 13,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'dsa',
    explanation: "Binary search divides the search space in half each time, giving O(log n) complexity."
  },
  {
    id: 14,
    question: "Which traversal visits the root node first in a binary tree?",
    options: ["Inorder", "Preorder", "Postorder", "Level order"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'dsa',
    explanation: "Preorder traversal visits: Root → Left → Right"
  },
  {
    id: 15,
    question: "What data structure is used in BFS traversal?",
    options: ["Stack", "Queue", "Array", "Linked List"],
    correctAnswer: 1,
    difficulty: 'medium',
    category: 'dsa',
    explanation: "BFS uses a Queue to process nodes level by level."
  },

  // Java - Hard
  {
    id: 16,
    question: "What is the output of this code?",
    code: `class A { int x = 10; }
class B extends A { int x = 20; }
public class Test {
  public static void main(String[] args) {
    A obj = new B();
    System.out.println(obj.x);
  }
}`,
    options: ["10", "20", "Compilation error", "Runtime error"],
    correctAnswer: 0,
    difficulty: 'hard',
    category: 'java',
    explanation: "Variables are not overridden in Java. Since reference type is A, obj.x refers to A's x = 10."
  },
  {
    id: 17,
    question: "What happens when you call wait() without synchronized?",
    options: ["Works normally", "IllegalMonitorStateException", "Compilation error", "Deadlock"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'java',
    explanation: "wait() must be called from synchronized context, otherwise IllegalMonitorStateException is thrown."
  },

  // OOPs - Hard
  {
    id: 18,
    question: "What is the Diamond Problem in Java?",
    options: [
      "Memory leak issue",
      "Ambiguity with multiple inheritance",
      "Null pointer issue",
      "Thread deadlock"
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'oops',
    explanation: "Diamond problem occurs when a class inherits from two classes that have a common parent, causing ambiguity."
  },
  {
    id: 19,
    question: "Which statement about Java interfaces is FALSE (post Java 8)?",
    options: [
      "Can have default methods",
      "Can have static methods",
      "Can have instance variables",
      "Can have private methods"
    ],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'oops',
    explanation: "Interfaces cannot have instance variables (non-static, non-final variables)."
  },

  // DSA - Hard
  {
    id: 20,
    question: "What is the time complexity of building a heap from n elements?",
    options: ["O(n log n)", "O(n)", "O(log n)", "O(n²)"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'dsa',
    explanation: "Building a heap using bottom-up approach is O(n), not O(n log n)."
  },
  {
    id: 21,
    question: "In a balanced BST with n nodes, what is the height?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'dsa',
    explanation: "A balanced BST maintains height of O(log n) for efficient operations."
  },
  {
    id: 22,
    question: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'dsa',
    explanation: "QuickSort's worst case is O(n²) when the pivot selection is poor (already sorted array)."
  },
  {
    id: 23,
    question: "Which algorithm finds the shortest path in a weighted graph?",
    options: ["DFS", "BFS", "Dijkstra's", "Prim's"],
    correctAnswer: 2,
    difficulty: 'hard',
    category: 'dsa',
    explanation: "Dijkstra's algorithm finds the shortest path from source to all vertices in a weighted graph."
  },
  {
    id: 24,
    question: "What is the space complexity of recursive Fibonacci without memoization?",
    options: ["O(1)", "O(n)", "O(log n)", "O(2^n)"],
    correctAnswer: 1,
    difficulty: 'hard',
    category: 'dsa',
    explanation: "The call stack depth for recursive Fibonacci is O(n)."
  }
];

export const getRandomQuestions = (count: number = 10): Question[] => {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard', count: number = 5): Question[] => {
  const filtered = quizQuestions.filter(q => q.difficulty === difficulty);
  const shuffled = filtered.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getMixedQuestions = (easy: number = 3, medium: number = 4, hard: number = 3): Question[] => {
  const easyQs = getQuestionsByDifficulty('easy', easy);
  const mediumQs = getQuestionsByDifficulty('medium', medium);
  const hardQs = getQuestionsByDifficulty('hard', hard);
  return [...easyQs, ...mediumQs, ...hardQs].sort(() => Math.random() - 0.5);
};
