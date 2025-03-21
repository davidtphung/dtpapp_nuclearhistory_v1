
export interface TimelineEvent {
  id: string;
  year: number;
  title: string;
  description: string;
  category: 'discovery' | 'technology' | 'policy' | 'event';
  detailedContent?: string;
  imageUrl?: string;
  notableFigures?: Array<{
    name: string;
    role: string;
    description?: string;
  }>;
  sources?: Array<{
    title: string;
    url: string;
  }>;
}

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'discovery-of-fission',
    year: 1938,
    title: 'Discovery of Nuclear Fission',
    description: 'Otto Hahn and Fritz Strassmann discover nuclear fission in Germany, with theoretical explanation from Lise Meitner and Otto Frisch.',
    category: 'discovery',
    detailedContent: 'In December 1938, German chemists Otto Hahn and Fritz Strassmann conducted experiments bombarding uranium with neutrons. They discovered that the uranium nucleus split into lighter elements when struck by neutrons, releasing massive amounts of energy. Lise Meitner and her nephew Otto Frisch provided the theoretical interpretation of this phenomenon, coining the term "nuclear fission." This discovery would fundamentally change physics and world history.',
    notableFigures: [
      {
        name: 'Otto Hahn',
        role: 'Chemist',
        description: 'German chemist who discovered nuclear fission, later awarded the Nobel Prize in Chemistry (1944).'
      },
      {
        name: 'Lise Meitner',
        role: 'Physicist',
        description: 'Austrian-Swedish physicist who provided the theoretical explanation for nuclear fission, but was controversially excluded from the Nobel Prize.'
      }
    ],
    sources: [
      {
        title: 'American Institute of Physics',
        url: 'https://www.aip.org/history-programs/physics-history/nuclear-fission-discovered'
      }
    ]
  },
  {
    id: 'einstein-letter',
    year: 1939,
    title: 'Einstein-Szilárd Letter',
    description: 'Albert Einstein and Leo Szilárd warn President Roosevelt about the potential for Nazi Germany to develop nuclear weapons.',
    category: 'policy',
    detailedContent: 'In August 1939, concerned about Nazi Germany's potential to develop nuclear weapons, physicists Leo Szilárd and Eugene Wigner drafted a letter to President Franklin D. Roosevelt. Albert Einstein signed the letter, lending his prestige to the warning. The letter alerted Roosevelt to the possibility of creating "extremely powerful bombs of a new type" and urged U.S. action. This letter would ultimately lead to the establishment of the Manhattan Project.',
    notableFigures: [
      {
        name: 'Albert Einstein',
        role: 'Physicist',
        description: 'Though he did not work directly on the Manhattan Project, his letter to Roosevelt was instrumental in starting U.S. atomic research.'
      },
      {
        name: 'Leo Szilárd',
        role: 'Physicist',
        description: 'Hungarian-American physicist who conceived the nuclear chain reaction and drafted the Einstein-Szilárd letter.'
      }
    ]
  },
  {
    id: 'manhattan-project',
    year: 1942,
    title: 'Manhattan Project Begins',
    description: 'The U.S. officially launches the Manhattan Project to develop the first nuclear weapons.',
    category: 'technology',
    detailedContent: 'In September 1942, the U.S. Army established the Manhattan Engineering District under the command of General Leslie Groves, with scientific leadership from J. Robert Oppenheimer. This secret program, which would come to be known as the Manhattan Project, employed over 130,000 people and cost nearly $2 billion (equivalent to about $23 billion today). Research and production facilities were built across the United States, with major sites at Oak Ridge, Tennessee; Hanford, Washington; and Los Alamos, New Mexico.',
    notableFigures: [
      {
        name: 'J. Robert Oppenheimer',
        role: 'Scientific Director',
        description: 'American physicist who served as scientific director of the Manhattan Project at Los Alamos Laboratory.'
      },
      {
        name: 'General Leslie Groves',
        role: 'Military Leader',
        description: 'U.S. Army Corps of Engineers officer who directed the Manhattan Project.'
      }
    ]
  },
  {
    id: 'first-nuclear-reactor',
    year: 1942,
    title: 'First Nuclear Reactor',
    description: 'Enrico Fermi and his team achieve the first controlled nuclear chain reaction at Chicago Pile-1.',
    category: 'technology',
    detailedContent: 'On December 2, 1942, a team led by Enrico Fermi achieved the first controlled, self-sustaining nuclear chain reaction at the University of Chicago. The experiment took place in a squash court beneath the university's football stadium, using a pile of graphite blocks and uranium arranged in a precise lattice. This success demonstrated that controlled nuclear energy was possible and paved the way for both nuclear weapons and peaceful nuclear energy applications.',
    notableFigures: [
      {
        name: 'Enrico Fermi',
        role: 'Physicist',
        description: 'Italian-American physicist who created the world\'s first nuclear reactor, Chicago Pile-1.'
      }
    ]
  },
  {
    id: 'trinity-test',
    year: 1945,
    title: 'Trinity Test',
    description: 'First detonation of a nuclear weapon in New Mexico.',
    category: 'event',
    detailedContent: 'On July 16, 1945, the United States conducted the world\'s first nuclear weapon test, codenamed "Trinity," in the Jornada del Muerto desert in New Mexico. The plutonium implosion device, nicknamed "The Gadget," produced an explosion equivalent to approximately 21 kilotons of TNT. The successful test confirmed the viability of the implosion-design plutonium weapon, which would later be used in the "Fat Man" bomb dropped on Nagasaki.',
    notableFigures: [
      {
        name: 'J. Robert Oppenheimer',
        role: 'Scientific Director',
        description: 'Upon witnessing the explosion, famously recalled the Bhagavad Gita verse: "Now I am become Death, the destroyer of worlds."'
      }
    ]
  },
  {
    id: 'hiroshima-nagasaki',
    year: 1945,
    title: 'Hiroshima and Nagasaki',
    description: 'Atomic bombs dropped on Hiroshima and Nagasaki, Japan, ending World War II.',
    category: 'event',
    detailedContent: 'On August 6 and 9, 1945, the United States dropped atomic bombs on the Japanese cities of Hiroshima and Nagasaki, respectively. The Hiroshima bomb, "Little Boy," used uranium-235 and had a yield of about 15 kilotons. The Nagasaki bomb, "Fat Man," used plutonium-239 and had a yield of about 21 kilotons. These remain the only use of nuclear weapons in armed conflict. The bombings killed between 129,000 and 226,000 people, mostly civilians, and led to Japan\'s surrender on August 15, ending World War II.',
  },
  {
    id: 'atomic-energy-act',
    year: 1946,
    title: 'Atomic Energy Act',
    description: 'U.S. establishes civilian control over nuclear energy through the Atomic Energy Commission.',
    category: 'policy',
    detailedContent: 'The Atomic Energy Act of 1946 transferred control of atomic energy from military to civilian hands, specifically the newly created Atomic Energy Commission (AEC). The Act established a government monopoly on nuclear materials and technology in the United States and prohibited the sharing of nuclear information with other countries. It represented the first attempt to establish both governmental control and a framework for the peaceful development of nuclear energy.',
  },
  {
    id: 'first-nuclear-power',
    year: 1951,
    title: 'First Nuclear Power Generation',
    description: 'Experimental Breeder Reactor I in Idaho becomes the first nuclear reactor to generate electricity.',
    category: 'technology',
    detailedContent: 'On December 20, 1951, at the National Reactor Testing Station (now Idaho National Laboratory), Experimental Breeder Reactor I (EBR-I) became the first nuclear reactor to generate usable amounts of electricity. The reactor initially produced about 100 kilowatts of electricity, enough to power its own building. This milestone demonstrated the feasibility of using nuclear energy for civilian electricity production.',
  },
  {
    id: 'atoms-for-peace',
    year: 1953,
    title: '"Atoms for Peace" Speech',
    description: 'President Eisenhower delivers his "Atoms for Peace" speech to the United Nations.',
    category: 'policy',
    detailedContent: 'On December 8, 1953, President Dwight D. Eisenhower delivered his "Atoms for Peace" speech to the United Nations General Assembly. In this landmark address, Eisenhower proposed international cooperation on peaceful applications of atomic energy. This initiative led to the establishment of the International Atomic Energy Agency (IAEA) and programs to provide nuclear technology and materials for peaceful purposes, marking a shift from purely military applications to civilian nuclear power.',
  },
  {
    id: 'first-commercial-plant',
    year: 1957,
    title: 'First Commercial Nuclear Power Plant',
    description: 'Shippingport Atomic Power Station, the first large-scale nuclear power plant in the U.S., begins operation.',
    category: 'technology',
    detailedContent: 'On December 2, 1957, the Shippingport Atomic Power Station in Pennsylvania, the first full-scale nuclear power plant devoted exclusively to civilian electricity production in the United States, reached criticality. The plant began commercial operation in 1958. Developed under President Eisenhower\'s "Atoms for Peace" program, Shippingport demonstrated the feasibility of commercial nuclear power and operated safely until its decommissioning in 1982.',
  },
  {
    id: 'three-mile-island',
    year: 1979,
    title: 'Three Mile Island Accident',
    description: 'Partial meltdown at Three Mile Island nuclear power plant in Pennsylvania.',
    category: 'event',
    detailedContent: 'On March 28, 1979, a cooling malfunction caused a partial meltdown at the Three Mile Island Nuclear Generating Station near Harrisburg, Pennsylvania. While there were no deaths or injuries, the accident released small amounts of radioactive gases and iodine into the environment. This event dramatically changed the perception of nuclear safety in the United States, leading to significantly increased regulatory oversight and effectively halting the expansion of nuclear power in the country for decades.',
  },
  {
    id: 'nuclear-waste-policy-act',
    year: 1982,
    title: 'Nuclear Waste Policy Act',
    description: 'Legislation establishes a national framework for the disposal of spent nuclear fuel and high-level radioactive waste.',
    category: 'policy',
    detailedContent: 'The Nuclear Waste Policy Act of 1982 established a comprehensive national program for the safe, permanent disposal of highly radioactive wastes from nuclear power plants. The Act directed the Department of Energy to study potential sites for a geological repository, with the costs to be paid by nuclear utilities. This legislation attempted to address one of the most significant challenges of nuclear power: the long-term management of nuclear waste.',
  },
  {
    id: 'yucca-mountain',
    year: 1987,
    title: 'Yucca Mountain Repository',
    description: 'Congress designates Yucca Mountain, Nevada as the sole site for a deep geological repository for nuclear waste.',
    category: 'policy',
    detailedContent: 'The Nuclear Waste Policy Amendments Act of 1987 designated Yucca Mountain in Nevada as the sole site for further study as a permanent geological repository for nuclear waste. This controversial decision, sometimes called the "Screw Nevada Bill," focused all repository efforts on one location. Despite decades of study and billions of dollars spent, political opposition and technical concerns have prevented the repository from being completed.',
  },
  {
    id: 'nuclear-renaissance',
    year: 2005,
    title: 'Nuclear Renaissance Begins',
    description: 'Energy Policy Act of 2005 provides incentives for new nuclear power plants.',
    category: 'policy',
    detailedContent: 'The Energy Policy Act of 2005 included significant incentives for the nuclear industry, such as loan guarantees, tax credits, and insurance against regulatory delays. These provisions were intended to spark a "nuclear renaissance" after decades without new nuclear plant construction in the United States. The legislation led to a wave of new plant applications, though many were eventually canceled due to economic factors and competition from cheap natural gas.',
  },
  {
    id: 'vogtle-construction',
    year: 2013,
    title: 'New Nuclear Construction',
    description: 'Construction begins on new reactors at Plant Vogtle, the first new nuclear units in the U.S. in decades.',
    category: 'technology',
    detailedContent: 'In 2013, construction began on two new AP1000 reactors at the Vogtle Electric Generating Plant in Georgia, representing the first new nuclear units built in the United States in over 30 years. The project has faced significant delays and cost overruns, highlighting the challenges of nuclear construction in the modern era. Despite these issues, Unit 3 entered commercial operation in July 2023, with Unit 4 following in early 2024.',
  },
  {
    id: 'small-modular-reactors',
    year: 2020,
    title: 'Small Modular Reactors',
    description: 'NuScale Power receives first U.S. approval for a small modular reactor design.',
    category: 'technology',
    detailedContent: 'In August 2020, NuScale Power received the first U.S. Nuclear Regulatory Commission design approval for a small modular reactor (SMR). SMRs represent a new approach to nuclear power generation, featuring standardized, factory-built reactors that can be transported to sites for assembly. These smaller reactors promise enhanced safety features, reduced construction times, and the ability to scale power generation based on demand, potentially overcoming some of the economic challenges faced by traditional large nuclear plants.',
  }
];
