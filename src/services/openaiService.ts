
import { timelineEvents } from '../utils/timelineData';

// Set up knowledge context from timeline data
const generateContext = () => {
  return timelineEvents.map(event => 
    `Event (${event.year}): ${event.title}\nDescription: ${event.description}\nImpact: ${event.impact}\n`
  ).join('\n\n');
};

const knowledgeContext = generateContext();

interface ChatCompletionOptions {
  readingLevel: 'kids' | 'novice' | 'college' | 'expert';
}

export const getNuclearHistory = async (question: string, options: ChatCompletionOptions = { readingLevel: 'novice' }) => {
  try {
    // In a real app, you would make an API call to OpenAI here
    // Since we can't make actual API calls in this demo, we'll simulate responses
    
    const { readingLevel } = options;
    
    // Simplified mapping of common questions to predetermined answers based on reading level
    const responses: Record<string, Record<string, string>> = {
      "When was nuclear fission discovered?": {
        kids: "Nuclear fission was discovered in 1938 by scientists Otto Hahn and Fritz Strassmann. It's like splitting a tiny atom into two parts, which releases a lot of energy!",
        novice: "Nuclear fission was discovered in 1938 by German chemists Otto Hahn and Fritz Strassmann. Lise Meitner, who had fled Nazi Germany, provided the theoretical explanation with her nephew Otto Frisch, identifying that the uranium nucleus was splitting when bombarded with neutrons.",
        college: "In December 1938, German chemists Otto Hahn and Fritz Strassmann conducted experiments where they bombarded uranium with neutrons, identifying barium as a product. Lise Meitner and Otto Frisch, who had fled Nazi Germany, provided the theoretical framework in January 1939, explaining that the uranium nucleus was being split and calculating the energy release using Einstein's E=mc² equation.",
        expert: "The discovery of nuclear fission occurred in December 1938 when Otto Hahn and Fritz Strassmann identified barium isotopes as products of neutron bombardment of uranium. The theoretical interpretation came from Lise Meitner and Otto Frisch in January 1939, who applied the liquid-drop nuclear model to explain how the uranium nucleus could split into two lighter nuclei. Their calculations using Einstein's mass-energy equivalence predicted an energy release of approximately 200 MeV per fission event, establishing the foundational physics for subsequent nuclear technology development."
      },
      "What was the Manhattan Project?": {
        kids: "The Manhattan Project was a big science project during World War II. Scientists worked together to build the first atomic bombs to help end the war.",
        novice: "The Manhattan Project was a US research and development program from 1942-1945 that produced the first nuclear weapons during World War II. It was led by Major General Leslie Groves with J. Robert Oppenheimer as scientific director, employing over 130,000 people across multiple sites.",
        college: "The Manhattan Project (1942-1945) was a top-secret US-led R&D undertaking that produced the first nuclear weapons. With a budget of nearly $2 billion (equivalent to about $23 billion today), it established multiple research and production facilities, including Los Alamos Laboratory, Oak Ridge, and Hanford. The project culminated in the Trinity test and the atomic bombings of Hiroshima and Nagasaki.",
        expert: "The Manhattan Project (1942-1945) represented an unprecedented convergence of scientific, industrial, and military resources to develop fission weapons. Under the direction of General Leslie Groves and scientific leadership of J. Robert Oppenheimer, the project pursued multiple technical pathways simultaneously: gaseous diffusion, electromagnetic separation, and thermal diffusion for uranium enrichment, plus plutonium production via nuclear reactors. The program established the scientific and engineering foundations of nuclear technology, while raising profound ethical questions about science's role in warfare that continue to influence scientific governance today."
      },
      "Tell me about the first nuclear power plant in the US": {
        kids: "The first nuclear power plant in America was called Shippingport. It started making electricity in 1957 in Pennsylvania and showed how we can use nuclear energy to power homes and schools!",
        novice: "The first full-scale nuclear power plant in the US was the Shippingport Atomic Power Station in Pennsylvania, which began operating in 1957. It demonstrated that nuclear energy could be used safely for commercial electricity generation using a pressurized water reactor design.",
        college: "The Shippingport Atomic Power Station in Pennsylvania became operational in 1957 as the first large-scale nuclear power plant devoted exclusively to peaceful electricity generation. A joint project between the Atomic Energy Commission and Duquesne Light Company, it proved the viability of the pressurized water reactor (PWR) design that would become the dominant reactor type in the United States commercial nuclear fleet.",
        expert: "The Shippingport Atomic Power Station, which achieved criticality in December 1957 and began commercial operations in 1958, represented the operationalization of Admiral Hyman Rickover's naval reactor technology for civilian purposes. The 60 MWe plant utilized a PWR design that became the technological foundation for much of the subsequent U.S. nuclear fleet. Particularly significant was its demonstration of a thorium-uranium-233 breeding cycle in its Core 2 operation (1977-1982), achieving a breeding ratio greater than 1.0 and validating light water breeder reactor physics—a capability that has renewed relevance for modern advanced reactor concepts focused on thorium fuel cycles."
      },
      "What happened at Three Mile Island?": {
        kids: "In 1979, there was an accident at a nuclear power plant called Three Mile Island. Some parts of the reactor got too hot, but no one was hurt. It taught us how to make nuclear plants safer.",
        novice: "The Three Mile Island accident in 1979 was a partial meltdown at a nuclear power plant near Harrisburg, Pennsylvania. While it led to no deaths or injuries, it was the most serious accident in U.S. commercial nuclear power history and caused increased regulations and public concern about nuclear energy.",
        college: "On March 28, 1979, a combination of equipment failures and operator errors led to a partial core meltdown at the Three Mile Island Nuclear Generating Station's Unit 2 reactor. The accident resulted in the release of radioactive gases and radioactive iodine into the environment, though studies concluded that the health effects were minimal. The incident fundamentally changed NRC regulatory practices and led to significant safety improvements throughout the industry.",
        expert: "The Three Mile Island accident on March 28, 1979, resulted from a complex cascade of mechanical failures and human factors issues, including a stuck-open pilot-operated relief valve (PORV) that allowed coolant to escape, combined with operator misinterpretation of plant conditions. Approximately 45% of the Unit 2 core melted, with some fuel reaching temperatures exceeding 2,800°C. Though radioactive noble gas releases occurred, detailed epidemiological studies found no statistically significant increase in cancer rates. The accident catalyzed sweeping reforms in human factors engineering, operator training protocols, emergency response planning, and the establishment of the Institute of Nuclear Power Operations (INPO) to promote operational excellence."
      },
      "Who were the key scientists in nuclear development?": {
        kids: "Many smart scientists helped develop nuclear science! Some important ones were Albert Einstein, Enrico Fermi, Marie Curie, and J. Robert Oppenheimer. They discovered how atoms work and how to use nuclear energy.",
        novice: "Key scientists in nuclear development included Albert Einstein, whose E=mc² formula explained the energy in atoms; Enrico Fermi, who created the first nuclear reactor; J. Robert Oppenheimer, who led the Manhattan Project; and Marie and Pierre Curie, who discovered radioactive elements.",
        college: "Nuclear science development was advanced by numerous scientists including Ernest Rutherford (discovered the nucleus), Niels Bohr (atomic structure model), Marie and Pierre Curie (radioactivity), Enrico Fermi (nuclear reactions and first reactor), Leo Szilard (chain reaction concept), Lise Meitner and Otto Frisch (nuclear fission interpretation), J. Robert Oppenheimer (Manhattan Project scientific director), Edward Teller and Stanislaw Ulam (hydrogen bomb), and Glenn Seaborg (plutonium and numerous transuranium elements).",
        expert: "Nuclear science emerged through contributions of numerous theoretical and experimental physicists spanning multiple research traditions: Ernest Rutherford's nuclear model and transmutation experiments; Niels Bohr's quantum mechanical atomic structure; Frederick Soddy's isotope concept; the Joliot-Curies' artificial radioactivity; Enrico Fermi's neutron moderation theories and experimental neutronics; Leo Szilard's conceptualization of neutron chain reactions; Lise Meitner and Otto Frisch's interpretation of nuclear fission using the liquid drop model; Hans Bethe's stellar nucleosynthesis work; Edward Teller and Stanislaw Ulam's radiation implosion concepts; and Glenn Seaborg's actinide chemistry. The transition from theoretical understanding to technological application was particularly driven by Ernest Lawrence's cyclotron program, Enrico Fermi's Chicago Pile experiments, and the engineering-scientific collaboration within the Manhattan Project under J. Robert Oppenheimer's scientific direction."
      },
      "What is nuclear fission?": {
        kids: "Nuclear fission is when the center of a very tiny atom splits into two pieces. When this happens, it releases a lot of energy that can be used to make electricity or, unfortunately, bombs.",
        novice: "Nuclear fission is the process where the nucleus of an atom splits into two or more smaller nuclei, releasing energy. This happens when a heavy, unstable atom (like uranium) is hit with a neutron, causing it to split and release more neutrons that can trigger additional fissions in a chain reaction.",
        college: "Nuclear fission occurs when a heavy nucleus (typically uranium-235 or plutonium-239) captures a neutron and becomes unstable, splitting into two lighter nuclei called fission fragments, while releasing additional neutrons and approximately 200 MeV of energy per fission event. The released neutrons can induce further fissions, creating a self-sustaining chain reaction that forms the basis for both controlled energy production in nuclear reactors and destructive power in nuclear weapons.",
        expert: "Nuclear fission represents a quantum mechanical tunneling phenomenon wherein a heavy nucleus, after neutron absorption creates a compound nucleus in an excited state, undergoes deformation along the liquid drop model parameters until reaching a critical point where electrostatic repulsion overcomes the nuclear strong force. This results in scission into asymmetric fission fragments, accompanied by prompt neutron emission (typically 2-3 neutrons), gamma radiation, and conversion of approximately 0.1% of the reactants' mass into energy (≈200 MeV). The Q-value is distributed primarily as kinetic energy of the fission fragments (≈165 MeV), with remaining energy manifested as fission neutron kinetic energy, prompt and delayed gamma emission, and beta decay of fission products. The specific fission product distribution follows characteristic probability curves centered around mass numbers A≈95 and A≈140, influenced by nuclear shell effects."
      }
    };
    
    // Normalize the question to help with matching
    const normalizedQuestion = question.trim().toLowerCase();
    
    // Check for exact or close matches to our predefined questions
    for (const [key, answers] of Object.entries(responses)) {
      if (normalizedQuestion.includes(key.toLowerCase())) {
        // Return the appropriate answer based on reading level
        return answers[readingLevel] || answers['novice'];
      }
    }
    
    // If no match found, provide a generic response
    const genericResponses = {
      kids: `I don't know the answer to that yet, but it sounds like an interesting question about nuclear history! Maybe try asking about when nuclear fission was discovered or about the Manhattan Project.`,
      novice: `That's an interesting question about nuclear history. While I don't have a specific answer prepared, you might want to explore our timeline of nuclear events or try asking about major events like the discovery of fission, the Manhattan Project, or early nuclear power plants.`,
      college: `That's a thought-provoking question on nuclear history. To provide an accurate response, I would need to consult additional specialized sources. Consider exploring the US Nuclear Regulatory Commission's historical archives or academic publications on nuclear science and technology history for detailed information on this topic.`,
      expert: `Your question touches on nuanced aspects of nuclear history that would require detailed examination of primary sources and specialized literature in nuclear science and technology. For a comprehensive analysis, I recommend consulting peer-reviewed publications in nuclear history, the technical archives of the NRC and DOE, or specialized academic works in this domain.`
    };
    
    return genericResponses[readingLevel] || genericResponses['novice'];
    
  } catch (error) {
    console.error('Error getting nuclear history:', error);
    return "I'm sorry, but I encountered an error while trying to answer your question. Please try again later.";
  }
};
