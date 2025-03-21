
export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  imageUrl?: string;
  impact: string;
  category: 'discovery' | 'policy' | 'technology' | 'event';
  sources?: string[];
  keyFigures?: string[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: "discovery-fission",
    year: 1938,
    title: "Discovery of Nuclear Fission",
    description: "German chemists Otto Hahn and Fritz Strassmann, along with Austrian physicist Lise Meitner, discovered nuclear fission. Meitner, who had fled Nazi Germany to Sweden, provided the theoretical explanation of the process with her nephew Otto Frisch.",
    imageUrl: "/placeholder.svg",
    impact: "This groundbreaking discovery revealed that the nucleus of uranium could be split when bombarded with neutrons, releasing enormous amounts of energy. It laid the foundation for both nuclear weapons and nuclear power generation.",
    category: "discovery",
    keyFigures: ["Otto Hahn", "Lise Meitner", "Fritz Strassmann", "Otto Frisch"],
    sources: ["Journal of Physics", "The Making of the Atomic Bomb by Richard Rhodes"]
  },
  {
    id: "einstein-letter",
    year: 1939,
    title: "Einstein-Szilárd Letter",
    description: "Albert Einstein signed a letter to President Franklin D. Roosevelt, drafted by physicist Leó Szilárd, warning that Germany might develop atomic weapons and urging the United States to begin its own nuclear research.",
    imageUrl: "/placeholder.svg",
    impact: "This letter directly led to the establishment of the Manhattan Project, the U.S. government research project that produced the first nuclear weapons during World War II.",
    category: "policy",
    keyFigures: ["Albert Einstein", "Leó Szilárd", "Franklin D. Roosevelt"],
    sources: ["FDR Presidential Library", "Einstein: His Life and Universe by Walter Isaacson"]
  },
  {
    id: "manhattan-project",
    year: 1942,
    title: "Manhattan Project Begins",
    description: "The U.S. Army Corps of Engineers established the Manhattan Project, a research and development undertaking that produced the first nuclear weapons during World War II. The project was led by Major General Leslie Groves with physicist J. Robert Oppenheimer as scientific director.",
    imageUrl: "/placeholder.svg",
    impact: "The Manhattan Project employed more than 130,000 people and cost nearly $2 billion (equivalent to about $23 billion in 2021). It resulted in the creation of multiple production and research sites, including Los Alamos Laboratory and Oak Ridge facility.",
    category: "technology",
    keyFigures: ["J. Robert Oppenheimer", "Leslie Groves", "Enrico Fermi", "Edward Teller"],
    sources: ["Department of Energy Archives", "The Making of the Atomic Bomb by Richard Rhodes"]
  },
  {
    id: "chicago-pile",
    year: 1942,
    title: "First Nuclear Chain Reaction",
    description: "Under the leadership of Enrico Fermi, scientists achieved the first controlled, self-sustaining nuclear chain reaction at the Chicago Pile-1 (CP-1) reactor at the University of Chicago.",
    imageUrl: "/placeholder.svg", 
    impact: "This experiment demonstrated that nuclear energy could be controlled, providing proof of concept for both nuclear power plants and atomic weapons. It was a crucial milestone in nuclear science.",
    category: "discovery",
    keyFigures: ["Enrico Fermi", "Leo Szilard", "Arthur Compton"],
    sources: ["Argonne National Laboratory History", "University of Chicago Archives"]
  },
  {
    id: "trinity-test",
    year: 1945,
    title: "Trinity Test",
    description: "The United States conducted the world's first nuclear weapon test, code-named 'Trinity,' in the Jornada del Muerto desert in New Mexico. The plutonium implosion device, nicknamed 'The Gadget,' yielded an explosive power equivalent to approximately 20 kilotons of TNT.",
    imageUrl: "/placeholder.svg",
    impact: "The successful Trinity test verified the implosion design of the plutonium bomb and led directly to the bombing of Nagasaki. J. Robert Oppenheimer famously quoted the Bhagavad Gita: 'Now I am become Death, the destroyer of worlds.'",
    category: "event",
    keyFigures: ["J. Robert Oppenheimer", "Leslie Groves", "George Kistiakowsky"],
    sources: ["Los Alamos National Laboratory History", "Department of Energy Archives"]
  },
  {
    id: "hiroshima-nagasaki",
    year: 1945,
    title: "Atomic Bombings of Hiroshima and Nagasaki",
    description: "The United States dropped atomic bombs on the Japanese cities of Hiroshima on August 6 and Nagasaki on August 9. The bombings resulted in approximately 210,000 deaths by the end of 1945 and led to Japan's surrender, ending World War II.",
    imageUrl: "/placeholder.svg",
    impact: "These events remain the only use of nuclear weapons in armed conflict. The bombings demonstrated the devastating power of nuclear weapons and profoundly shaped international relations in the post-war era, beginning the atomic age and the nuclear arms race.",
    category: "event",
    keyFigures: ["Harry S. Truman", "Paul Tibbets", "Charles Sweeney"],
    sources: ["National Archives and Records Administration", "Hiroshima by John Hersey"]
  },
  {
    id: "aec-formation",
    year: 1946,
    title: "Atomic Energy Commission Established",
    description: "The United States Atomic Energy Commission (AEC) was established under the Atomic Energy Act of 1946. This civilian agency took over the nuclear research and production facilities built during the Manhattan Project.",
    imageUrl: "/placeholder.svg",
    impact: "The AEC was responsible for both the development of nuclear weapons and promotion of peaceful uses of nuclear energy. It marked the transition of atomic energy from military to civilian control, though still with significant government oversight.",
    category: "policy",
    keyFigures: ["David E. Lilienthal", "Lewis Strauss", "Brien McMahon"],
    sources: ["Department of Energy Historical Archives", "Nuclear Regulatory Commission History"]
  },
  {
    id: "first-commercial-reactor",
    year: 1957,
    title: "First Commercial Nuclear Power Plant",
    description: "The Shippingport Atomic Power Station in Pennsylvania became the first full-scale nuclear power plant devoted exclusively to peacetime uses. It was designed to demonstrate the viability of the pressurized water reactor (PWR) for commercial electricity generation.",
    imageUrl: "/placeholder.svg",
    impact: "Shippingport proved that nuclear energy could be used for commercial electricity generation. Its successful operation helped establish the pressurized water reactor design that would become the dominant reactor type in the United States.",
    category: "technology",
    keyFigures: ["Hyman Rickover", "Duquesne Light Company", "Westinghouse Electric"],
    sources: ["U.S. Department of Energy", "Nuclear Regulatory Commission"]
  },
  {
    id: "three-mile-island",
    year: 1979,
    title: "Three Mile Island Accident",
    description: "A partial meltdown occurred at the Three Mile Island nuclear power plant near Harrisburg, Pennsylvania. Although it led to no deaths or injuries, it was the most serious accident in U.S. commercial nuclear power plant history.",
    imageUrl: "/placeholder.svg",
    impact: "The accident greatly affected public perception of nuclear power and led to stricter regulations on the nuclear industry. It halted new nuclear plant construction in the United States for over 30 years and heightened concerns over nuclear safety.",
    category: "event",
    keyFigures: ["Jimmy Carter", "Harold Denton", "Metropolitan Edison Company"],
    sources: ["Nuclear Regulatory Commission Reports", "The Report of the President's Commission on the Accident at Three Mile Island"]
  },
  {
    id: "nuclear-renaissance",
    year: 2007,
    title: "Nuclear Renaissance Begins",
    description: "The Nuclear Regulatory Commission received the first application for a new nuclear power plant license in nearly 30 years, beginning what was called a 'nuclear renaissance' in the United States.",
    imageUrl: "/placeholder.svg",
    impact: "This marked a potential revival of the nuclear power industry in the U.S. after decades of stagnation. The renaissance was driven by concerns over climate change and energy security, as nuclear power produces minimal greenhouse gas emissions.",
    category: "policy",
    keyFigures: ["NuStart Energy Consortium", "Dale Klein", "Southern Company"],
    sources: ["Nuclear Regulatory Commission", "World Nuclear Association"]
  }
];
