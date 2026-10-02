export const COMBINED_STEPS = [
  {
    id: 1,
    title: 'Personal Details & Health Goals',
    shortTitle: 'Personal Details',
    description: 'Basic contact information, body metrics, and main health concerns.',
    icon: 'user',
    subsections: [
      {
        title: '1. Personal Details',
        description: 'Identity, demographics, physical parameters, and contact info',
        fields: [
          { id: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'e.g. Jane Doe' },
          { id: 'dob', label: 'Date of Birth', type: 'date', required: true },
          {
            id: 'timeOfBirth',
            label: 'Time of Birth',
            type: 'time',
            help: '(Please enter your birth time only if you know the correct/exact time.)'
          },
          {
            id: 'placeOfBirth',
            label: 'Place of Birth',
            type: 'text',
            placeholder: 'City / Town, State, Country'
          },
          {
            id: 'sexAtBirth',
            label: 'Sex at Birth',
            type: 'radio',
            required: true,
            options: ['Female', 'Male', 'Intersex', 'Prefer not to say']
          },
          {
            id: 'occupation',
            label: 'Occupation / What do you do?',
            type: 'text',
            placeholder: 'e.g. Software Engineer'
          },
          { id: 'height', label: 'Height', type: 'text', placeholder: 'e.g. 5 ft 8 in or 173 cm' },
          { id: 'currentWeight', label: 'Current Weight', type: 'text', placeholder: 'e.g. 68 kg or 150 lbs' },
          {
            id: 'usualWeight',
            label: 'Usual / Comfortable Weight, if different',
            type: 'text',
            placeholder: 'e.g. 65 kg'
          },
          { id: 'email', label: 'Email Address', type: 'email', required: true, placeholder: 'name@example.com' },
          { id: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+1 555-0123' },
          {
            id: 'previousConsultation',
            label: 'Have you had an Ayurvedic consultation before?',
            type: 'radio',
            required: true,
            options: ['Yes', 'No']
          },
          {
            id: 'lastConsultationWhen',
            label: 'If yes, when was your last Ayurvedic consultation?',
            type: 'text',
            placeholder: 'e.g. 6 months ago, in 2023, etc.',
            showIf: (formData) => formData.previousConsultation === 'Yes'
          }
        ]
      },
      {
        title: '2. Your Main Health Concerns',
        description:
          'We’d like to understand what is bringing you to Ayurveda at this stage of your life. Please share what you are experiencing in your own words.',
        fields: [
          {
            id: 'mainReason',
            label: 'What is the main reason you are seeking an Ayurvedic consultation?',
            type: 'textarea',
            required: true,
            placeholder: 'Describe in your own words what is bringing you to Ayurveda...'
          },
          {
            id: 'topConcerns',
            label:
              'Please list up to 3 health concerns that you would most like us to focus on, in order of importance.',
            type: 'textarea',
            required: true,
            placeholder: '1. Primary concern\n2. Secondary concern\n3. Third concern'
          },
          {
            id: 'concernStarted',
            label: 'When did your main concern begin?',
            type: 'text',
            placeholder: 'e.g. 3 months ago, since childhood, after COVID...'
          },
          {
            id: 'concernOnset',
            label: 'How did it begin?',
            type: 'radio',
            help: 'Please select one.',
            options: ['Suddenly', 'Gradually', 'I’m not sure']
          },
          {
            id: 'concernPattern',
            label: 'How does your concern usually occur?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'It is present most of the time',
              'It comes and goes',
              'It is seasonal',
              'It is related to stress',
              'It is related to certain foods',
              'It is related to menstrual or hormonal changes',
              'I’m not sure',
              'Other'
            ]
          },
          {
            id: 'symptomsWorse',
            label: 'Have you noticed anything that makes your symptoms or concern worse?',
            type: 'textarea',
            placeholder: 'Cold weather, certain foods, lack of sleep, stress...'
          },
          {
            id: 'symptomsBetter',
            label: 'Have you noticed anything that makes your symptoms or concern better?',
            type: 'textarea',
            placeholder: 'Warmth, rest, specific food, massage...'
          },
          {
            id: 'treatmentsTried',
            label:
              'What treatments, medicines, diets, supplements, or other therapies have you tried so far?',
            type: 'textarea',
            placeholder: 'Allopathy, homeopathy, physiotherapy, specific diets, herbs...'
          },
          {
            id: 'concernImpact',
            label: 'How much does your main concern affect your day-to-day life?',
            type: 'scale',
            min: 0,
            max: 10,
            minLabel: '0 - Not at all',
            maxLabel: '10 - Extremely',
            help: '0 = Not at all  10 = Extremely',
            defaultValue: 5
          },
          {
            id: 'consultationGoal',
            label: 'What would you most like to achieve from your Ayurvedic consultation?',
            type: 'textarea',
            placeholder: 'Symptom relief, long-term healing, understanding body constitution, lifestyle guide...'
          },
          {
            id: 'concernAdditionalNotes',
            label:
              'Feel free to share anything else about your main concern that you think would help us understand what you are going through.',
            type: 'textarea',
            placeholder: 'Any further observations or experiences...'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Medical History & Investigations',
    shortTitle: 'Medical History',
    description:
      'Current health conditions, past medical history, medications, allergies, and lab reports.',
    icon: 'heart',
    subsections: [
      {
        title: '3. Your Medical History & Investigations',
        description:
          'This section helps us understand your health history and any medical care or investigations you may have had in the past. Please share whatever you feel is relevant.',
        fields: [
          {
            id: 'hasDiagnosedConditions',
            label: 'Do you currently have any diagnosed medical conditions?',
            type: 'radio',
            options: ['No', 'Yes']
          },
          {
            id: 'diagnosedConditionsDetail',
            label: 'If yes, please mention the condition(s) and briefly describe them.',
            type: 'textarea',
            placeholder: 'Mention conditions such as hypertension, thyroid, asthma, PCOS, etc.',
            showIf: (formData) => formData.hasDiagnosedConditions === 'Yes'
          },
          {
            id: 'hasSignificantIllnesses',
            label: 'Have you had any significant illnesses, surgeries, or hospitalizations in the past?',
            type: 'radio',
            options: ['No', 'Yes']
          },
          {
            id: 'significantIllnessesDetail',
            label: 'If yes, please mention what happened and approximately when.',
            type: 'textarea',
            placeholder: 'e.g. Appendectomy in 2018, jaundice in 2015...',
            showIf: (formData) => formData.hasSignificantIllnesses === 'Yes'
          },
          {
            id: 'hasAllergies',
            label: 'Do you have any allergies or known reactions to foods, medicines, herbs, or supplements?',
            type: 'radio',
            options: ['No', 'Yes']
          },
          {
            id: 'allergiesDetail',
            label: 'If yes, please tell us what you are allergic or sensitive to and what kind of reaction you experience.',
            type: 'textarea',
            placeholder: 'e.g. Penicillin (rash), peanuts (swelling), dairy (bloating)...',
            showIf: (formData) => formData.hasAllergies === 'Yes'
          },
          {
            id: 'takingPrescriptions',
            label: 'Are you currently taking any prescription medicines?',
            type: 'radio',
            options: ['No', 'Yes']
          },
          {
            id: 'prescriptionsDetail',
            label: 'If yes, please provide the medicine name, dose, and reason for taking it.',
            type: 'textarea',
            placeholder: 'e.g. Thyronorm 50mcg for hypothyroidism, Metformin 500mg...',
            showIf: (formData) => formData.takingPrescriptions === 'Yes'
          },
          {
            id: 'takingSupplements',
            label: 'Are you currently taking any vitamins, minerals, herbal/Ayurvedic preparations, or other supplements?',
            type: 'radio',
            options: ['No', 'Yes']
          },
          {
            id: 'supplementsDetail',
            label: 'If yes, please mention the name, dose (if known), and how often you take them.',
            type: 'textarea',
            placeholder: 'e.g. Vitamin D3 60,000 IU once a week, Ashwagandha 1 capsule daily...',
            showIf: (formData) => formData.takingSupplements === 'Yes'
          },
          {
            id: 'familyHistoryNotice',
            type: 'notice',
            label: 'Family Health History',
            help: 'Hereditary patterns can give valuable insight into your constitution and health tendencies.'
          },
          {
            id: 'familyHistoryConditions',
            label: 'Is there a family history of any of the following conditions?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Diabetes',
              'High blood pressure (Hypertension)',
              'Heart disease',
              'Stroke',
              'Skin disease',
              'None of these',
              'Other'
            ]
          },
          {
            id: 'familyHistoryDetail',
            label:
              'If you selected any condition above, please tell us who in your family had it (for example, mother, father, sibling, grandparent) and briefly describe their condition, if you know.',
            type: 'textarea',
            placeholder: 'e.g. Father has diabetes, maternal grandmother had hypertension...'
          },
          {
            id: 'recentInvestigationsNotice',
            type: 'notice',
            label: 'Recent Investigations',
            help: 'Medical tests and diagnostic laboratory examinations.'
          },
          {
            id: 'hasRecentInvestigations',
            label: 'Have you had any medical tests or investigations recently?',
            type: 'radio',
            options: ['No', 'Yes']
          },
          {
            id: 'recentInvestigationsList',
            label: 'If yes, what investigations have you had?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Blood tests',
              'Urine test',
              'Stool test',
              'Ultrasound',
              'X-ray',
              'CT / MRI',
              'Other'
            ],
            showIf: (formData) => formData.hasRecentInvestigations === 'Yes'
          },
          {
            id: 'investigationFindings',
            label: 'If you have received any important or abnormal findings, please mention them here.',
            type: 'textarea',
            placeholder: 'e.g. Elevated cholesterol, low vitamin B12, fatty liver grade 1...'
          },
          {
            id: 'medicalReportsFile',
            label: 'If available, you may upload any relevant recent medical reports.',
            type: 'file',
            accept: 'image/*,.pdf',
            help: 'Upload PDF or clear photograph of your medical reports.'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Digestion & Elimination',
    shortTitle: 'Digestion & Bowels',
    description:
      'Assessment of digestive fire (Agni), bowel habits (Mala), urination (Mutra), and tongue (Jihva).',
    icon: 'activity',
    subsections: [
      {
        title: '4. Digestion & Appetite — Agni',
        description:
          'In Ayurveda, digestion and appetite are closely connected with Agni, or your digestive fire. The following questions will help us understand your usual digestive patterns.',
        fields: [
          {
            id: 'appetiteDescription',
            label: 'How would you describe your appetite on most days?',
            type: 'radio',
            options: ['Strong', 'Moderate / Normal', 'Low', 'Variable', 'I often forget to eat']
          },
          {
            id: 'hungryBeforeMeals',
            label: 'Do you usually feel genuinely hungry before meals?',
            type: 'radio',
            options: ['Almost always', 'Usually', 'Sometimes', 'Rarely', 'Never']
          },
          {
            id: 'missedMealReaction',
            label: 'If you miss or delay a meal, what usually happens?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Nothing significant',
              'Weakness',
              'Tiredness',
              'Irritability',
              'Shakiness',
              'Dizziness',
              'Headache',
              'Nausea',
              'Very strong hunger',
              'Other'
            ]
          },
          {
            id: 'digestiveSymptoms',
            label: 'Which digestive symptoms do you regularly experience?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'None',
              'Bloating',
              'Gas',
              'Belching',
              'Heartburn / Acidity',
              'Indigestion',
              'Heaviness after meals',
              'Sleepiness after meals',
              'Nausea',
              'Abdominal pain or discomfort',
              'Feeling full very quickly',
              'Food intolerance',
              'Other'
            ]
          }
        ]
      },
      {
        title: '5. Bowel Habits — Mala',
        description:
          'In Ayurveda, bowel habits and elimination are an important part of understanding your overall health and digestion. Please answer based on your usual pattern, rather than an occasional change.',
        fields: [
          {
            id: 'stoolFrequency',
            label: 'How often do you usually pass stool?',
            type: 'radio',
            options: [
              'More than twice a day',
              '1–2 times a day',
              'Once a day',
              'Every other day',
              'Less than 3 times a week',
              'Irregular / Variable'
            ]
          },
          {
            id: 'stoolColor',
            label: 'What colour is your stool most often?',
            type: 'radio',
            options: [
              'Medium / Dark brown',
              'Light brown',
              'Yellowish',
              'Greenish',
              'Very dark / Black',
              'Pale / Clay-coloured',
              'Reddish / Blood noticed',
              'Variable',
              'Unsure',
              'Other'
            ]
          },
          {
            id: 'stoolConsistency',
            label: 'What is the usual consistency of your stool?',
            type: 'radio',
            options: [
              'Hard / Dry',
              'Firm and formed',
              'Soft and formed',
              'Loose',
              'Watery',
              'Alternates between hard and loose',
              'Variable'
            ]
          },
          {
            id: 'bowelExperiences',
            label: 'Do you commonly experience any of the following?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Straining while passing stool',
              'Constipation',
              'Loose stools / Diarrhoea',
              'Urgency to pass stool',
              'Feeling of incomplete evacuation',
              'Sticky stool',
              'Mucus',
              'Undigested food in stool',
              'Strong or unusual smell',
              'Gas',
              'Bloating',
              'Pain or discomfort while passing stool',
              'None of these',
              'Other'
            ]
          },
          {
            id: 'evacuatedFeel',
            label: 'After passing stool, do you generally feel completely evacuated?',
            type: 'radio',
            options: ['Yes', 'Usually', 'Sometimes', 'Rarely', 'No']
          },
          {
            id: 'bloodInStool',
            label: 'Have you noticed blood in your stool?',
            type: 'radio',
            options: ['No', 'Occasionally', 'Repeatedly']
          }
        ]
      },
      {
        title: '6. Urination — Mutra',
        description: 'Please answer based on your usual pattern, rather than an occasional change.',
        fields: [
          {
            id: 'urineColor',
            label: 'What colour is your urine most often?',
            type: 'radio',
            options: [
              'Clear / Almost colourless',
              'Pale yellow',
              'Yellow',
              'Dark yellow',
              'Orange / Dark',
              'Reddish / Pink',
              'Cloudy',
              'Variable',
              'Unsure',
              'Other'
            ]
          },
          {
            id: 'urineFlow',
            label: 'How would you describe your usual urine flow?',
            type: 'radio',
            options: ['Normal', 'Less / Weak', 'Interrupted', 'Difficulty starting', 'Variable']
          },
          {
            id: 'urineBurning',
            label: 'Do you experience burning during or after urination?',
            type: 'radio',
            options: ['No', 'Occasionally', 'Frequently']
          },
          {
            id: 'urinePain',
            label: 'Do you experience pain during or after urination?',
            type: 'radio',
            options: ['No', 'Occasionally', 'Frequently']
          },
          {
            id: 'urineTiming',
            label: 'When do you tend to urinate more frequently?',
            type: 'radio',
            options: [
              'Mainly during the daytime',
              'Mainly during the nighttime',
              'Similar during the day and night',
              'I do not experience increased frequency'
            ]
          },
          {
            id: 'urineDaytimeCount',
            label: 'Approximately how many times do you urinate during the day?',
            type: 'text',
            placeholder: 'e.g. 5-7 times'
          },
          {
            id: 'urineNightCount',
            label: 'How many times do you usually wake up at night to urinate?',
            type: 'radio',
            options: ['Never', 'Once', 'Twice', '3 or more times']
          },
          {
            id: 'urinarySymptoms',
            label: 'Do you experience any of the following?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Sudden urgency',
              'Difficulty holding urine',
              'Leakage / Incontinence',
              'Feeling that the bladder has not completely emptied',
              'Unusually strong urine smell',
              'None of these',
              'Other'
            ]
          }
        ]
      },
      {
        title: '7. Tongue Observation',
        description:
          'Your tongue can provide useful information about digestion and overall health from an Ayurvedic perspective.',
        fields: [
          {
            id: 'tongueNotice',
            type: 'notice',
            label: 'Please upload one clear photograph of your tongue.',
            help:
              'Ideally, take the photograph shortly after waking up, before brushing your teeth, cleaning or scraping your tongue, eating, or drinking. Natural daylight is preferred.'
          },
          {
            id: 'tonguePhoto',
            label: 'Upload tongue photograph',
            type: 'file',
            accept: 'image/*'
          },
          {
            id: 'morningMouthSmell',
            label:
              'When you wake up in the morning, do you usually notice any unpleasant or unusual smell from your mouth?',
            type: 'radio',
            options: [
              'No, not usually',
              'Mild',
              'Moderate',
              'Strong',
              'It varies from day to day',
              'I’m not sure'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Diet, Routine & Natural Urges',
    shortTitle: 'Diet & Routine',
    description:
      'Nutritional patterns (Ahara), Six Tastes (Shad Rasa), Natural Urges (Vega), and daily lifestyle habits (Dinacharya).',
    icon: 'coffee',
    subsections: [
      {
        title: '8. Diet & Meal Routine — Ahara',
        description:
          'Your daily food habits and meal timings can tell us a lot about your digestion, routine, and relationship with food. Please answer based on what you usually do, unless a question specifically asks about yesterday.',
        fields: [
          {
            id: 'breakfastTime',
            label: 'On most days, approximately what time do you have breakfast?',
            type: 'time'
          },
          {
            id: 'lunchTime',
            label: 'On most days, approximately what time do you have lunch?',
            type: 'time'
          },
          {
            id: 'dinnerTime',
            label: 'On most days, approximately what time do you have dinner?',
            type: 'time'
          },
          {
            id: 'mealRegularity',
            label: 'How regular are your usual meal timings?',
            type: 'radio',
            options: ['Very regular', 'Mostly regular', 'Sometimes irregular', 'Very irregular']
          },
          {
            id: 'yesterdayMeals',
            label:
              'Please describe everything you ate and drank yesterday, along with the approximate time of each meal or drink.',
            type: 'textarea',
            help: 'You can include snacks, tea/coffee, sweets, or anything else you had during the day.',
            placeholder: 'Breakfast: Oatmeal and tea at 8:30 AM\nLunch: Rice, dal, and vegetables at 1:30 PM\nSnack: Apple at 5 PM\nDinner: Khichdi at 8 PM'
          },
          {
            id: 'dietType',
            label: 'How would you describe your usual diet?',
            type: 'radio',
            options: ['Omnivorous', 'Vegetarian', 'Vegan', 'Pescatarian', 'Other']
          },
          {
            id: 'takeawayFrequency',
            label: 'How often do you eat restaurant or takeaway food?',
            type: 'radio',
            options: ['Rarely', '1–2 times a week', '3–4 times a week', 'Most days']
          },
          {
            id: 'waterIntake',
            label: 'Approximately how much water do you drink in a day?',
            type: 'text',
            placeholder: 'e.g. 2 litres, 8 glasses'
          },
          {
            id: 'caffeineIntake',
            label: 'How many cups of tea, coffee, or other caffeinated drinks do you usually have each day?',
            type: 'text',
            placeholder: 'e.g. 2 cups of tea'
          },
          {
            id: 'lateNightEating',
            label: 'Do you regularly eat late at night?',
            type: 'radio',
            options: ['No', 'Occasionally', 'Frequently', 'Almost every night']
          }
        ]
      },
      {
        title: '9. Shad Rasa — The Six Tastes (षड् रस)',
        description:
          'In Ayurveda, there are six primary tastes (Shad Rasa). Understanding which tastes are commonly present in your diet, as well as the ones you naturally enjoy or crave, can help us understand your eating patterns better.',
        fields: [
          {
            id: 'regularTastes',
            label: 'Which tastes are most commonly present in your regular daily diet?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Madhura (मधुर) — Sweet',
              'Amla (अम्ल) — Sour',
              'Lavana (लवण) — Salty',
              'Katu (कटु) — Pungent / Spicy',
              'Tikta (तिक्त) — Bitter',
              'Kashaya (कषाय) — Astringent',
              'Unsure'
            ]
          },
          {
            id: 'cravedTastes',
            label: 'Which tastes do you personally enjoy or crave the most?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Madhura (मधुर) — Sweet',
              'Amla (अम्ल) — Sour',
              'Lavana (लवण) — Salty',
              'Katu (कटु) — Pungent / Spicy',
              'Tikta (तिक्त) — Bitter',
              'Kashaya (कषाय) — Astringent',
              'No particular preference'
            ]
          },
          {
            id: 'cravedFoods',
            label: 'Please mention a few foods that you particularly enjoy or often crave.',
            type: 'text',
            placeholder: 'e.g. Dark chocolate, spicy chaat, sour curd, warm soups...'
          },
          {
            id: 'dislikedFoods',
            label: 'Are there any foods that you avoid, dislike, or feel do not suit you? Please tell us a little about them.',
            type: 'textarea',
            placeholder: 'e.g. Raw onions give heartburn, heavy fried foods cause lethargy...'
          }
        ]
      },
      {
        title: '10. Natural Urges — Vega (वेग)',
        description:
          'In Ayurveda, Vega refers to natural bodily urges and certain mental or behavioural impulses. This section is simply about understanding your usual habits and responses to these natural urges and impulses. There are no right or wrong answers.',
        fields: [
          {
            id: 'adharaniyaVegaNotice',
            type: 'notice',
            label: 'Adharaniya Vega (अधारणीय वेग)',
            help: 'Natural bodily urges that should generally not be unnecessarily suppressed or postponed.'
          },
          {
            id: 'suppressedUrgesList',
            label:
              'Do you regularly suppress or postpone any of the following natural bodily urges, either when you are with other people or when you are alone?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Mutra (मूत्र) — Urine',
              'Purisha (पुरीष) — Stool / Defecation',
              'Shukra (शुक्र) — Semen / Ejaculation',
              'Vata (वात) — Flatus / Passing gas',
              'Chhardi (छर्दि) — Vomiting',
              'Kshavathu (क्षवथु) — Sneezing',
              'Udgara (उद्गार) — Belching',
              'Jrimbha (जृम्भा) — Yawning',
              'Kshudha (क्षुधा) — Hunger',
              'Trishna (तृष्णा) — Thirst',
              'Ashru (अश्रु) — Tears',
              'Nidra (निद्रा) — Sleep',
              'Shramashwasa (श्रमश्वास) — Breathing after exertion',
              'None of these',
              'Unsure'
            ]
          },
          {
            id: 'suppressionReason',
            label: 'If you suppress or postpone any of these urges, why do you usually do so?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Work',
              'Travel',
              'Meetings',
              'Social embarrassment',
              'Lack of access to a toilet or private space',
              'Habit',
              'I do not want to interrupt what I am doing',
              'I tend to ignore my body\'s signals',
              'Other'
            ]
          },
          {
            id: 'discomfortAfterSuppression',
            label: 'Do you notice any discomfort or symptoms after suppressing a natural urge?',
            type: 'radio',
            options: ['No', 'Yes', 'Unsure']
          },
          {
            id: 'discomfortAfterSuppressionDetail',
            label: 'If yes, please tell us what you experience.',
            type: 'textarea',
            placeholder: 'Headache, bloating, abdominal cramps, restlessness...',
            showIf: (formData) => formData.discomfortAfterSuppression === 'Yes'
          },
          {
            id: 'dharaniyaVegaNotice',
            type: 'notice',
            label: 'Dharaniya Vega (धारणीय वेग)',
            help: 'Mental and behavioural impulses that are considered appropriate to control or restrain.'
          },
          {
            id: 'dharaniyaImpulses',
            label: 'Do you find any of the following mental or behavioural impulses difficult to control or restrain?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Lobha (लोभ) — Greed',
              'Irshya (ईर्ष्या) — Envy / Jealousy',
              'Dvesha (द्वेष) — Hatred / Aversion',
              'Matsarya (मात्सर्य) — Malice / Jealousy',
              'Raga (राग) — Excessive attachment / Passion',
              'Asatya (असत्य) — Falsehood / Lying',
              'Parusha Vakya (परुष वाक्य) — Harsh speech',
              'Apriya Vakya (अप्रिय वाक्य) — Hurtful / Unpleasant speech',
              'Himsa (हिंसा) — Violence',
              'Paradrawyabhidhyana (परद्रव्याभिध्यान) — Coveting another person\'s property',
              'Para-stri-gamana / Kama (परस्त्रीगमन / काम) — Sexual misconduct / Inappropriate sexual desire',
              'None of these',
              'Unsure'
            ]
          },
          {
            id: 'dharaniyaImpulsesDetail',
            label:
              'If applicable, please tell us a little about any of these impulses that you experience frequently or find difficult to manage.',
            type: 'textarea',
            placeholder: 'Feel free to share what you notice in yourself...'
          }
        ]
      },
      {
        title: '13. Daily Routine — Dinacharya',
        description: 'Daily habits, exercise, and Ayurvedic self-care routines.',
        fields: [
          {
            id: 'regularWakeTime',
            label: 'What time do you normally wake up?',
            type: 'time'
          },
          {
            id: 'exerciseFrequency',
            label: 'How often do you exercise or engage in physical activity?',
            type: 'radio',
            options: ['Most days', '3–4 times a week', '1–2 times a week', 'Occasionally', 'Rarely / Never']
          },
          {
            id: 'exerciseType',
            label: 'What type of physical activity or exercise do you usually do?',
            type: 'text',
            placeholder: 'e.g. Walking, yoga, gym, swimming'
          },
          {
            id: 'sittingHours',
            label: 'Approximately how many hours a day do you spend sitting?',
            type: 'text',
            placeholder: 'e.g. 6-8 hours'
          },
          {
            id: 'ayurvedicPractices',
            label: 'Which of the following do you regularly practice as part of your daily or weekly routine?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Yoga',
              'Workout/Gym',
              'Meditation',
              'Pranayama / Breathwork',
              'Walking',
              'Running',
              'Tongue scraping',
              'Oil pulling',
              'Abhyanga / Self-massage',
              'Nasya',
              'None of these',
              'Other'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Sleep, Mind, Constitution & Women’s Health',
    shortTitle: 'Sleep & Mind',
    description:
      'Sleep quality (Nidra), mental vitality, stress responses, natural constitution (Prakriti), and hormonal balance.',
    icon: 'moon',
    subsections: [
      {
        title: '11. Sleep — Nidra',
        description:
          'Sleep is an important part of health and well-being in Ayurveda. We’d like to understand not only how long you sleep, but also how restful your sleep feels and what your usual sleep patterns are like.',
        fields: [
          { id: 'bedtime', label: 'What time do you usually go to bed?', type: 'time' },
          { id: 'sleepWakeTime', label: 'What time do you usually wake up?', type: 'time' },
          {
            id: 'sleepHours',
            label: 'Approximately how many hours do you sleep each night?',
            type: 'text',
            placeholder: 'e.g. 7-8 hours'
          },
          {
            id: 'sleepQuality',
            label: 'How would you rate your overall sleep quality?',
            type: 'scale',
            min: 0,
            max: 10,
            minLabel: '0 - Very poor',
            maxLabel: '10 - Excellent',
            help: '0 = Very poor  10 = Excellent',
            defaultValue: 6
          },
          {
            id: 'sleepDisturbances',
            label: 'Do you experience any of the following during your sleep?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Difficulty falling asleep',
              'Frequent waking during the night',
              'Waking around the same time each night',
              'Waking too early in the morning',
              'Light / Easily disturbed sleep',
              'Very deep / Heavy sleep',
              'Vivid dreams',
              'Nightmares',
              'Snoring',
              'Known sleep apnea',
              'Daytime sleepiness',
              'Difficulty waking up',
              'None of these',
              'Other'
            ]
          },
          {
            id: 'dreamsNotice',
            type: 'notice',
            label: 'Dreams',
            help: 'Ayurveda views dream themes as reflections of subconscious mental activity and dosha balance.'
          },
          {
            id: 'dreamDescriptions',
            label: 'How would you describe your dreams most often?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'I rarely remember my dreams',
              'I usually do not dream or do not remember dreaming',
              'Calm / Pleasant dreams',
              'Active / Fast-paced dreams',
              'Dreams involving movement, travel, flying, or running',
              'Dreams involving fear, conflict, anger, or arguments',
              'Dreams involving water, rain, oceans, or other flowing elements',
              'Dreams involving fire, heat, light, or intense colours',
              'Dreams involving food or eating',
              'Dreams involving animals, nature, or the outdoors',
              'Dreams involving spiritual or religious experiences',
              'Dreams involving people from my past',
              'Dreams that feel emotionally intense',
              'Disturbing dreams / Nightmares',
              'Recurring dreams',
              'Other',
              'Unsure'
            ]
          },
          {
            id: 'dreamRecallFrequency',
            label: 'How often do you remember your dreams after waking?',
            type: 'radio',
            options: ['Almost every day', 'Often', 'Sometimes', 'Rarely', 'Almost never']
          },
          {
            id: 'wakeRefreshed',
            label: 'Do you wake feeling refreshed?',
            type: 'radio',
            options: ['Yes', 'Usually', 'Sometimes', 'Rarely', 'Never']
          }
        ]
      },
      {
        title: '12. Energy, Mind & Stress',
        description:
          'Your energy levels, mental state, and response to stress can provide useful context for understanding your overall well-being.',
        fields: [
          {
            id: 'currentEnergy',
            label: 'How would you rate your current energy level?',
            type: 'scale',
            min: 0,
            max: 10,
            minLabel: '0 - Low',
            maxLabel: '10 - High',
            defaultValue: 6
          },
          {
            id: 'currentStress',
            label: 'How would you rate your current level of stress?',
            type: 'scale',
            min: 0,
            max: 10,
            minLabel: '0 - Low',
            maxLabel: '10 - High',
            defaultValue: 5
          },
          {
            id: 'mentalClarity',
            label: 'How would you rate your current mental clarity?',
            type: 'scale',
            min: 0,
            max: 10,
            minLabel: '0 - Low',
            maxLabel: '10 - High',
            defaultValue: 6
          },
          {
            id: 'overallWellbeing',
            label: 'How would you rate your overall sense of well-being at present?',
            type: 'scale',
            min: 0,
            max: 10,
            minLabel: '0 - Low',
            maxLabel: '10 - High',
            defaultValue: 6
          },
          {
            id: 'stressResponses',
            label: 'When you are under stress, what do you most commonly experience?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Worry',
              'Anxiety / Fear',
              'Racing thoughts',
              'Difficulty sleeping',
              'Irritability',
              'Anger / Frustration',
              'Impatience',
              'Emotional eating',
              'Withdrawal / Wanting to be alone',
              'Low motivation',
              'Heaviness / Lethargy',
              'Other'
            ]
          },
          {
            id: 'stressSources',
            label: 'What are the main sources of stress or emotional strain in your life at present?',
            type: 'textarea',
            help: 'This could include work, relationships, family, lifestyle changes, financial concerns, or anything else that may be affecting you.',
            placeholder: 'Work pressure, personal relationships, financial worries, health concerns...'
          },
          {
            id: 'experiencedTraumaOrLoss',
            label:
              'Have you experienced any significant or distressing event, trauma, loss, or major life change—recently or in the past—that you feel may still be affecting your physical or emotional well-being?',
            type: 'radio',
            options: ['No', 'Yes', 'Unsure', 'Prefer not to say']
          },
          {
            id: 'traumaOrLossDetail',
            label: 'If you feel comfortable sharing, please tell us a little about it.',
            type: 'textarea',
            help: 'You do not need to share any details you are not comfortable discussing. Even a brief description is enough.',
            placeholder: 'Share briefly if you feel comfortable...',
            showIf: (formData) => formData.experiencedTraumaOrLoss === 'Yes'
          }
        ]
      },
      {
        title: '14. Natural Constitution — Prakriti-Oriented Questions',
        description:
          'This section is about your natural tendencies and characteristics—how you have generally been for most of your adult life. Please try to answer based on your usual, long-term nature, rather than how you have been feeling recently or during an illness.',
        fields: [
          {
            id: 'bodyFrame',
            label: 'What is your natural body frame?',
            type: 'radio',
            options: ['Thin / Light', 'Medium', 'Broad / Solid']
          },
          {
            id: 'weightTendency',
            label: 'How does your weight naturally tend to behave?',
            type: 'radio',
            options: ['Difficult to gain weight', 'Relatively stable', 'Gains weight easily']
          },
          {
            id: 'skinType',
            label: 'How would you describe your natural skin type?',
            type: 'radio',
            options: [
              'Dry / Rough',
              'Warm / Sensitive / Prone to redness',
              'Soft / Smooth / Oily',
              'Combination'
            ]
          },
          {
            id: 'hairType',
            label: 'How would you describe your natural hair type?',
            type: 'radio',
            options: [
              'Dry / Coarse / Frizzy',
              'Fine / Soft / Prone to early greying or thinning',
              'Thick / Oily / Lustrous',
              'Mixed'
            ]
          },
          {
            id: 'bodyTemperature',
            label: 'How do you naturally tend to experience body temperature?',
            type: 'radio',
            options: [
              'Usually colder than others',
              'Usually warmer than others',
              'Generally comfortable',
              'Variable'
            ]
          },
          {
            id: 'naturalAppetite',
            label: 'How would you describe your natural appetite?',
            type: 'radio',
            options: ['Variable', 'Strong / Sharp', 'Steady / Moderate']
          },
          {
            id: 'naturalSleep',
            label: 'How would you describe your natural sleep pattern?',
            type: 'radio',
            options: ['Light / Easily disturbed', 'Moderate', 'Deep / Long']
          },
          {
            id: 'naturalPace',
            label: 'What is your natural pace and way of doing things?',
            type: 'radio',
            options: ['Quick / Changeable', 'Focused / Purposeful', 'Calm / Steady']
          },
          {
            id: 'naturalMemory',
            label: 'How would you describe your natural memory and learning style?',
            type: 'radio',
            options: [
              'Learn quickly but may forget quickly',
              'Sharp / Precise',
              'Take longer to learn but retain well'
            ]
          },
          {
            id: 'temperament',
            label: 'How would you describe your natural temperament?',
            type: 'radio',
            options: [
              'Enthusiastic / Creative / Changeable',
              'Driven / Focused / Intense',
              'Calm / Patient / Steady',
              'A mixture of these'
            ]
          }
        ]
      },
      {
        title: '15. Women’s Health — If Applicable',
        description:
          'If applicable to you, this section helps us understand your menstrual, reproductive, and hormonal health. Please share only what you feel comfortable sharing.',
        fields: [
          {
            id: 'menarcheAge',
            label: 'At what age did your first menstrual period (menarche) begin?',
            type: 'text',
            placeholder: 'e.g. 13 years'
          },
          {
            id: 'reproductiveStatus',
            label: 'Which of the following best describes your current stage?',
            type: 'radio',
            options: [
              'Menstruating',
              'Pregnant',
              'Breastfeeding',
              'Perimenopausal',
              'Menopausal',
              'Postmenopausal',
              'Not applicable'
            ]
          },
          {
            id: 'menstrualCycleNotice',
            type: 'notice',
            label: 'Menstrual Cycle',
            help: 'Details regarding your menstrual flow and regularity (skip if not applicable)'
          },
          {
            id: 'cycleRegularity',
            label: 'If you are currently menstruating, how regular are your menstrual cycles?',
            type: 'radio',
            options: ['Regular', 'Irregular', 'Unsure']
          },
          {
            id: 'cycleLength',
            label: 'What is your average menstrual cycle length?',
            type: 'text',
            help: 'For example, 28 days.',
            placeholder: 'e.g. 28 days'
          },
          {
            id: 'periodDuration',
            label: 'How many days does your period usually last?',
            type: 'text',
            placeholder: 'e.g. 4-5 days'
          },
          {
            id: 'menstrualFlow',
            label: 'How would you describe your usual menstrual flow?',
            type: 'radio',
            options: ['Light', 'Moderate', 'Heavy', 'Variable']
          },
          {
            id: 'menstrualSymptoms',
            label: 'Do you usually experience any of the following around your period?',
            type: 'checkbox',
            help: 'Select all that apply.',
            options: [
              'Pain / Cramps',
              'Blood clots',
              'PMS / Premenstrual symptoms',
              'Irritability',
              'Anxiety',
              'Low mood',
              'Headaches / Migraines',
              'Bloating',
              'Breast tenderness',
              'Food cravings',
              'Fatigue',
              'None of these',
              'Other'
            ]
          },
          {
            id: 'lmpDate',
            label: 'When was the first day of your last menstrual period (LMP), if applicable?',
            type: 'date'
          },
          {
            id: 'hormonalReproductiveNotice',
            type: 'notice',
            label: 'Hormonal & Reproductive Health',
            help: 'General hormonal and reproductive considerations'
          },
          {
            id: 'womensHealthNotes',
            label:
              'Is there anything related to your menstrual, pregnancy, fertility, perimenopausal, or menopausal health that you would like us to know about?',
            type: 'textarea',
            help: 'You may share any concerns, changes, symptoms, or experiences that feel relevant to your consultation.',
            placeholder: 'Share any hormonal, cycle, fertility or menopausal notes...'
          }
        ]
      }
    ]
  }
];

export const CONSENT_SECTION = {
  title: '17. Consent & Declaration',
  description: 'Before we begin your Ayurvedic consultation, please take a moment to read the statement below.',
  fields: [
    {
      id: 'consentNotice',
      type: 'notice',
      label: 'By submitting this form, I confirm that:',
      help:
        '• The information I have shared is accurate and complete to the best of my knowledge.\n• I have disclosed my relevant health conditions, current medicines, supplements, allergies, and other information that may be important for my Ayurvedic consultation.\n• I understand that the information I provide will help the Ayurvedic practitioner understand my Prakriti (individual constitution), current health concerns, digestive and lifestyle patterns, and overall state of wellbeing, and guide the consultation accordingly.\n• I understand that Ayurvedic consultation is complementary to appropriate medical care and does not replace necessary medical diagnosis, emergency care, or treatment.\n• I will not stop, change, or discontinue any prescribed medication without first consulting the healthcare professional who prescribed it.\n• I understand that any symptoms or health concerns requiring urgent medical attention should be assessed through appropriate medical services without waiting for an Ayurvedic consultation.\n• I consent to my information being reviewed and used for the purpose of my Ayurvedic consultation and related care, in accordance with the practitioner’s applicable privacy and data-handling practices.'
    },
    {
      id: 'consentAgreement',
      label: 'Agreement & Declaration',
      type: 'checkbox',
      required: true,
      options: [
        'I have read and understood the above, and I agree to proceed with my Ayurvedic consultation.'
      ]
    },
    {
      id: 'consentFullName',
      label: 'Full Name',
      type: 'text',
      required: true,
      placeholder: 'Type your full legal name'
    },
    {
      id: 'consentDate',
      label: 'Date',
      type: 'date',
      required: true
    }
  ]
};
