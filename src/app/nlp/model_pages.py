# Parry, Lalita and Nick Welcome Pages
import json


asteroid_parry_json = [
    {"key": 0,
     "type": "Basic Text",
     "phrase": "The most \"natural\" language to a computer",
     "description": """
• Machines are very simple.  They are not hardwired with things like feelings, emotions, self-awareness, consciousness...<br/>
• Despite the inability of text to store and retain these things, there are many sources of text and writing where these things are perceived and conveyed to some degree.  When reading a book, an article, a blog, there is a "voice" that is present that influences your understanding of the words used.<br/>
• The idea is to be able to process the text with an understanding that there is (1) the Intended Meaning and (2) the Perceived Meaning, neither of which may be known at any given time.""",
     "subject": [
        {"type": "Syntax/Grammar",
         "description": "Defining the basic unit of text, understanding how these units interact and combine into larger units..",
         "link": "/coming_soon",
         "key": 0},
        {"type": "Semantics",
         "description": "The \"Sentence meaning\"",
         "link": "/coming_soon",
         "key": 1},
        {"type": "Pragmatics",
         "description": "The \"Speaker meaning\"",
         "link": "/coming_soon",
         "key": 2}
     ],
    },
    {"key": 1,
     "type": "Speech Audio",
     "phrase": "The most \"natural\" language for humans",
     "description": """
• There is a lot of information ingrained in the sounds that humans hear.  We can distinguish non-living sounds from sounds of the living, harmonious melodies and discords of noise.<br/>
• Assuming we discern a sound as speech, our understanding of the words spoken is influenced by our recognition of various defining characteristics, such as tone, pitch and loudness.  It's important to note that extracting the speaker's meaning is no easy task.<br/>
• Think about how many different people pronounce the same words differently ... Think about all of the different accents that exist ... The point is to understand how all of these factors effect a word's meaning.""",
     "subject": [
        {"type": "Phonetics",
         "description": "Understanding the physical properties of speech",
         "link": "/coming_soon",
         "key": 1},
        {"type": "Phonology",
         "description": "Using the physical properties to create meaning structures",
         "link": "/coming_soon",
         "key": 2},
        {"type": "Morphology",
         "description": "Understanding the flexibilities of these structures",
         "link": "/coming_soon",
         "key": 3}
     ]
    },
    {"key": 2,
     "type": "Seeing the World",
     "phrase": "The language no one talks about",
     "description": """
Much of the world is never explicitly talked about.  When we talk, we often assume things that make up the context of what is being said.  Consider the following conversation,<br/>
&nbsp;&nbsp;&nbsp;&nbsp;A: What is that?<br/>
&nbsp;&nbsp;&nbsp;&nbsp;B: I'm not sure.  They've been here for a while now.<br/>
Without visual knowledge of the world, there is no way a computer would know what "that" refers to.  Granted, with a longer conversation, "that" may become known.  However, a human with vision would have a much different understanding of the conversation.
     """,
     "subject": [
        {"type": "Real-world Objects",
         "description": "What makes up the world around us",
         "link": "/coming_soon",
         "key": 1},
        {"type": "Reference Clues",
         "description": "Understanding how things are connected",
         "link": "/coming_soon",
         "key": 2},
        {"type": "Object Definitions / Relations",
         "description": "What defines an object, it's functions and properties",
         "link": "/coming_soon",
         "key": 3}
     ]
    }
]

asteroid_lalita_json = [
    {"key": 0,
     "type": "Aspects of Language",
     "phrase": "What defines a language?",
     "description": """
• There are over <a href="https://www.ethnologue.com/about">7,000 languages</a> at the time of writing.  Each of these languages have a host characteristics that define them.<br/>
• Since we are primarily using the English language, most of the analysis will be applied to English; however, we'll try to keep the main concepts as general as possible to allow adaptation for other languages.<br/>
• The end goal is to be able to understand what makes these languages tick, or rather, the mindset of individuals that use each language.
     """,
     "subject": [
        {"type": "Language Structure",
         "description": "How is language created?",
         "link": "/coming_soon",
         "key": 0},
        {"type": "Language Use",
         "description": "Understanding the intended and real use cases of language",
         "link": "/coming_soon",
         "key": 1},
        {"type": "Language Expansion",
         "description": "Introduction of new ideas and concepts",
         "link": "/coming_soon",
         "key": 2},
     ],
    },
    {"key": 1,
     "type": "Languages vs. Dialects",
     "phrase": "Where does it end?",
     "description": """
• Dialects present a unique scenario to the realm of NLP.  The argument is that a different language introduces a new perspective on how to communicate ideas.  However, by the same respect, a dialect might just be different enough that it merits its own "language" (i.e. New York English vs. Alabama English).<br/>
• To prevent a million spinoffs from each language, it should be noted that each dialect exists as an extension of a language.  And while there will be differences, these differences should be captured in a language-independent way.<br/>
• Impossible, you say?  Well, we'll just have to find out (:
     """,
     "subject": [
        {"type": "Generality",
         "description": "How to make languages general enough to include dialects...",
         "link": "/coming_soon",
         "key": 1},
        {"type": "Specialization",
         "description": "...while still keeping the unique dialect meanings.",
         "link": "/coming_soon",
         "key": 2},
        {"type": "Known / Unknown Side Effects",
         "description": "What is inherently good or bad about these approaches?",
         "link": "/coming_soon",
         "key": 3}
     ]
    },
]

asteroid_nick_json = [
    {"key": 0,
     "type": "Expanding Knowledge",
     "phrase": "The cause and effect of communication",
     "description": """
Why do we use langauge...?<br/>
....To communicate ideas, theories, beliefs, values, reasoning ... knowledge?<br/>
What happens when we communicate these things...?<br/>
....We create more knowledge?<br/>
How do we use this knowledge...?<br/>
....By communicating with language?
     """,
     "subject": [
        {"type": "The Self",
         "description": "Understanding what it means to be an object, a person, a thing, a being... an individual unit",
         "link": "/coming_soon",
         "key": 0},
        {"type": "The Group",
         "description": "Understanding how the units identify in relation to other similar and/or different units",
         "link": "/coming_soon",
         "key": 1},
        {"type": "The System",
         "description": "Understanding the process(es) by which units/groups function to find purpose and/or reasoning to exist",
         "link": "/coming_soon",
         "key": 2},
     ],
    },
    {"key": 1,
     "type": "Energy Flow",
     "phrase": "Even stagnant energy causes motion",
     "description": """
• Energy is ubiquitous around us.  It is present in things we can sense and in things we do not yet know how to sense.  One of the first clear distinctions to make is that physical energy is different from life energy.  <b>Physical energy</b> causes much of the world around us to move, change and flow.  <b>Life energy</b> is what we have inside of us that allows us to think, create and make decisions.  They may be one and the same.  However, we do not currently understand them as such.<br/>
• Energy is very unique because it can always be converted into a form that is relevant to its application.  Matching the form with the application causes wondrous things to happen.  Furthermore, by understanding the flow of energy, the power of its reality can be unlocked..
• 
• 
     """,
     "subject": [
        {"type": "Potential Energy",
         "description": "Energy at rest",
         "link": "/coming_soon",
         "key": 0},
        {"type": "Kinetic Energy",
         "description": "Energy in motion",
         "link": "/coming_soon",
         "key": 1},
        {"type": "Physical-Metaphysical Interaction",
         "description": "Understanding the complexities of things both physical and intangible",
         "link": "/coming_soon",
         "key": 2},
     ],
    },
    {"key": 2,
     "type": "The Four Element Model",
     "phrase": "\"It is important to draw wisdom from many different places\" - Iroh",
     "description": """
• This model was created to illustrate the fact that <b>things that we think are rigid and separate are actually more free and connected</b>.  Specifically, this model tries to understand the "Idea Cycle."  The way in which ideas form Information that have Attributes which leads to Action where Knowledge is gained and Information is gathered once again.<br/>
• Because it is a cycle, the process can be started at any of the four elements.  There is one restriction which is that each element acts as the bridge from the previous element to the next element.  While any combination of the elements can result in something new, "energy" or data must flow in the cycle: <i>Water, Earth, Fire, Air,</i> ...<br/>
     """,
     "subject": [
        {"type": "Water",
         "description": "The element of Information",
         "link": "/coming_soon",
         "key": 0},
        {"type": "Earth",
         "description": "The element of Attributes",
         "link": "/coming_soon",
         "key": 1},
        {"type": "Fire",
         "description": "The element of Actions",
         "link": "/coming_soon",
         "key": 2},
        {"type": "Air",
         "description": "The element of Knowledge",
         "link": "/coming_soon",
         "key": 3},
     ],
    },
]

openings_parry = {
    0: 'processing',
    1: 'Hello, I am <strong>Parry</strong>, the Keeper of the knowledge of the Mode of Processing.',
    2: 'As a Keeper, I merely maintain and distribute the knowledge that was entrusted to me.  You will meet my friends later on who preserve the deeper Modes of NLP.  Together we seek to help foster a world of understanding to bring about peace and harmony between humans and machines.  Prepare yourself mentally and physicially and when you are ready..',
    3: 'Removing the Limitations',
    4: 'As humans, we have FIVE main senses that we use to experience the world: (1) Sight, (2) Hearing, (3) Touch, (4) Taste and (5) Smell.  Currently, machines are only capable of "understanding" the first two.  However, our understanding of the world is dependent on combinations of these senses, not necessarily any one of them in isolation.  When we form ideas and communicate with each other, these ideas are influenced by our understanding of the other aspects that aren\'t always explicitly stated.',
}

openings_lalita = {
    0: 'language',
    1: 'Hi, my name is <strong>Lalita</strong>, the Keeper of the knowledge of the Mode of Language.',
    2: 'Apart from protecting and preserving knowledge, my friends and I are tasked with building a strong community.  A community of people with diverse backgrounds whose beliefs and values aren\'t necessarily the same, but are clear and benevolent.  Because of the delicate nature of our work, it is important that you remain truthful to yourself on this journey and follow your heart..',
    3: 'Bridging Language Barriers',
    4: 'In order to truly understand any given language, it might be helpful to create a "universal language template."  This template will define everything that is known to humans about our language and it is abstract enough to allow new properties and features of a language as necessary.  Not every language will have the same specifications, but just knowing that fact will help understand problems that arise.  It is essential to capture the real-world implications and reasonings as to why something is a certain way.',
}

openings_nick = {
    0: 'natural',
    1: 'Hmm.. I am <strong>Nick</strong>, the Keeper of the knowledge of the Mode of the Natural Core.',
    2: 'You\'ve already met Parry and Lalita.  Being experts in their respective domains, they are both very helpful and informative.  Unfortunately, I am known to disrupt their fluidity because I try to connect them with the ever-changing universe that lies beyond our worlds.  Yes, my domain may be located in the center of those of my friends, but the connection to everything else transcends the material universe and is irrespective of any sort of physical understanding of things.',
    3: 'What\'s next?',
    4: 'We still have a long way to go before we can say we understand anything we think we do as humans.  We know so little about our universe, yet we constantly create and indulge in new universes which may or may not be possible.  Our ability to weave together anything and everything makes our existence very dynamic.  We have a word for "<i>everything</i>" and this ability of ours to imagine is only limited by us (when not considering diseases that prohibit mental capacity).  Normally, we don\'t think of humans as God (and imho we aren\'t exactly).  But to think we have all of this power.  You should just think about why we could have possibly been given it.  For what reason do we need it.',
}


parry_summary = json.dumps(asteroid_parry_json)
lalita_summary = json.dumps(asteroid_lalita_json)
nick_summary = json.dumps(asteroid_nick_json)
