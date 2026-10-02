export const COMBINED_STEPS = [
  {
    id: 1,
    title: 'Patient Profile & Health Concerns',
    shortTitle: 'Profile & Concerns',
    description: 'Basic contact information and your primary reasons for seeking an Ayurvedic consultation.',
    icon: 'user',
    subsections: [
      {
        title: 'Personal Details',
        description: 'Basic demographic and contact information',
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
            placeholder: 'e.g. 6 months ago, in 2023, etc.'
          }
        ]
      },
      {
        title: 'Primary Health Concerns',
        description: 'Details about your current complaints and what you hope to achieve',
        fields: [
          {
            id: 'mainReason',
            label: 'What is the MAIN reason you are seeking an Ayurvedic consultation?',
            type: 'textarea',
            required: true,
            placeholder: 'Describe your primary health complaint or wellness objective in detail...'
          },
          {
            id: 'topConcerns',
            label: 'Please list up to 3 health concerns in order of importance.',
            type: 'textarea',
            placeholder: '1. ...\n2. ...\n3. ...'
          },
          { id: 'concernBegan', label: 'When did your main concern begin?', type: 'text', placeholder: 'e.g. 6 months ago, after illness, etc.' },
          {
            id: 'concernOnset',
            label: 'Did it begin:',
            type: 'radio',
            options: ['Suddenly', 'Gradually', 'Unsure']
          },
          {
            id: 'problemNature',
            label: 'Is the problem:',
            type: 'checkbox',
            options: [
              'Constant',
              'Comes and goes',
              'Seasonal',
              'Related to stress',
              'Related to food',
              'Related to menstrual/hormonal changes',
              'Unsure',
              'Other'
            ]
          },
          { id: 'symptomsWorse', label: 'What makes your symptoms worse?', type: 'textarea', placeholder: 'Triggers, foods, weather, stress, lack of sleep...' },
          { id: 'symptomsBetter', label: 'What makes them better?', type: 'textarea', placeholder: 'Warmth, rest, specific food, massage...' },
          {
            id: 'treatmentsTried',
            label: 'What treatments, diets, supplements or therapies have you already tried?',
            type: 'textarea'
          },
          {
            id: 'concernImpact',
            label: 'How much does your main concern affect your daily life?',
            type: 'scale',
            min: 0,
            max: 10,
            minLabel: 'Not at all',
            maxLabel: 'Extremely',
            defaultValue: 5
          },
          {
            id: 'consultationGoal',
            label: 'What would you most like to achieve from your Ayurvedic consultation?',
            type: 'textarea',
            placeholder: 'e.g. Relieve chronic bloating, improve sleep quality, understand constitution...'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Medical History & Investigations',
    shortTitle: 'Medical History',
    description: 'Past medical events, current medications, allergies, and diagnostic reports.',
    icon: 'clipboard',
    subsections: [
      {
        title: 'Conditions & Previous Illnesses',
        description: 'Existing diagnoses and past medical background',
        fields: [
          { id: 'diagnosedConditions', label: 'Please list any diagnosed medical conditions you currently have.', type: 'textarea' },
          { id: 'previousIllnesses', label: 'Please list any significant previous illnesses, surgeries or hospitalizations.', type: 'textarea' },
          { id: 'familyHistory', label: 'Is there any significant family history of illness?', type: 'textarea' }
        ]
      },
      {
        title: 'Medications & Known Allergies',
        description: 'Prescription drugs, supplements, and sensitivities',
        fields: [
          {
            id: 'hasAllergies',
            label: 'Do you have any allergies or known reactions to foods, medicines, herbs or supplements?',
            type: 'radio',
            options: ['No', 'Yes']
          },
          { id: 'allergiesDetail', label: 'If yes, please explain allergies/reactions:', type: 'textarea' },
          {
            id: 'takingPrescriptions',
            label: 'Are you currently taking prescription medication?',
            type: 'radio',
            options: ['No', 'Yes']
          },
          { id: 'prescriptionsDetail', label: 'If yes, please provide medicine name, dose and reason for taking it:', type: 'textarea' },
          { id: 'supplementsDetail', label: 'Please list any vitamins, minerals, herbal/Ayurvedic preparations or supplements you currently take.', type: 'textarea' }
        ]
      },
      {
        title: 'Recent Diagnostic Investigations',
        description: 'Medical tests and electronic lab reports',
        fields: [
          {
            id: 'medicalInvestigations',
            label: 'Have you recently had any medical investigations?',
            type: 'checkbox',
            options: ['Blood tests', 'Urine test', 'Stool test', 'Ultrasound', 'X-ray', 'CT/MRI', 'Other', 'None recently']
          },
          { id: 'investigationFindings', label: 'Please mention any important findings from tests:', type: 'textarea' },
          {
            id: 'reportsDriveLink',
            label: 'Medical reports - Google Drive link (optional)',
            type: 'text',
            help: 'Upload relevant recent reports to Google Drive and paste a shareable link here.',
            placeholder: 'https://drive.google.com/...'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'Digestion & Elimination',
    shortTitle: 'Digestion & Bowels',
    description: 'Assessment of digestive fire (Agni), bowel habits (Mala), and urination (Mutra).',
    icon: 'activity',
    subsections: [
      {
        title: 'Digestion & Appetite — Agni',
        description: 'Digestive fire, hunger patterns, and post-meal sensations',
        fields: [
          {
            id: 'appetiteDescription',
            label: 'How would you describe your appetite most days?',
            type: 'radio',
            options: ['Strong', 'Moderate/normal', 'Low', 'Variable', 'I often forget to eat']
          },
          {
            id: 'hungryBeforeMeals',
            label: 'Do you normally feel genuinely hungry before meals?',
            type: 'radio',
            options: ['Almost always', 'Usually', 'Sometimes', 'Rarely', 'Never']
          },
          {
            id: 'missedMealReaction',
            label: 'If you miss or delay a meal, what tends to happen?',
            type: 'checkbox',
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
            options: [
              'None',
              'Bloating',
              'Gas',
              'Belching',
              'Heartburn/acidity',
              'Indigestion',
              'Heaviness after meals',
              'Sleepiness after meals',
              'Nausea',
              'Abdominal pain/discomfort',
              'Feeling full very quickly',
              'Food intolerance',
              'Other'
            ]
          }
        ]
      },
      {
        title: 'Bowel Habits — Mala',
        description: 'Frequency, consistency, and elimination comfort',
        fields: [
          {
            id: 'stoolFrequency',
            label: 'How often do you usually pass stool?',
            type: 'radio',
            options: [
              'More than twice daily',
              '1–2 times daily',
              'Once daily',
              'Every other day',
              'Less than 3 times per week',
              'Irregular/variable'
            ]
          },
          {
            id: 'stoolColor',
            label: 'What colour is your stool MOST OFTEN?',
            type: 'radio',
            options: [
              'Medium/dark brown',
              'Light brown',
              'Yellowish',
              'Greenish',
              'Very dark/black',
              'Pale/clay-coloured',
              'Reddish/blood noticed',
              'Variable',
              'Unsure',
              'Other'
            ]
          },
          {
            id: 'stoolConsistency',
            label: 'What is the usual consistency?',
            type: 'radio',
            options: [
              'Hard/dry',
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
            label: 'Do you commonly experience:',
            type: 'checkbox',
            options: [
              'Straining',
              'Constipation',
              'Loose stools/diarrhea',
              'Urgency',
              'Incomplete evacuation',
              'Sticky stool',
              'Mucus',
              'Undigested food',
              'Strong/unusual smell',
              'Gas',
              'Bloating',
              'Pain while passing stool',
              'None of these'
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
        title: 'Urination — Mutra',
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
        description: 'Your tongue can provide useful information about digestion and overall health from an Ayurvedic perspective.',
        fields: [
          {
            id: 'tongueNotice',
            type: 'notice',
            label: 'Please upload one clear photograph of your tongue.',
            help: 'Ideally, take the photograph shortly after waking up, before brushing your teeth, cleaning or scraping your tongue, eating, or drinking. Natural daylight is preferred.'
          },
          {
            id: 'tonguePhoto',
            label: 'Upload tongue photograph',
            type: 'file',
            accept: 'image/*'
          },
          {
            id: 'morningMouthSmell',
            label: 'When you wake up in the morning, do you usually notice any unpleasant or unusual smell from your mouth?',
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
    title: 'Diet, Tastes & Daily Routine',
    shortTitle: 'Diet & Routine',
    description: 'Nutritional patterns (Ahara), Six Tastes (Shad Rasa), and daily lifestyle habits (Dinacharya).',
    icon: 'coffee',
    subsections: [
      {
        title: 'Diet & Meal Timings — Ahara',
        description: 'Schedule, hydration, and general food intake',
        fields: [
          { id: 'breakfastTime', label: 'On most days, approximately what time do you have breakfast?', type: 'time' },
          { id: 'lunchTime', label: 'On most days, approximately what time do you have lunch?', type: 'time' },
          { id: 'dinnerTime', label: 'On most days, approximately what time do you have dinner?', type: 'time' },
          {
            id: 'mealRegularity',
            label: 'How regular are these meal timings?',
            type: 'radio',
            options: ['Very regular', 'Mostly regular', 'Sometimes irregular', 'Very irregular']
          },
          {
            id: 'yesterdayMeals',
            label: 'Please describe what you ate and drank YESTERDAY, including approximate times.',
            type: 'textarea',
            placeholder: 'Breakfast: Oatmeal at 8am\nLunch: Rice, vegetables at 1pm\nDinner: Soup at 8pm'
          },
          {
            id: 'dietType',
            label: 'Your diet is primarily:',
            type: 'radio',
            options: ['Omnivorous', 'Vegetarian', 'Vegan', 'Pescatarian', 'Other']
          },
          {
            id: 'takeawayFrequency',
            label: 'How often do you eat restaurant/takeaway food?',
            type: 'radio',
            options: ['Rarely', '1–2 times/week', '3–4 times/week', 'Most days']
          },
          { id: 'waterIntake', label: 'Approximately how much water do you drink each day?', type: 'text', placeholder: 'e.g. 2 litres, 8 glasses' },
          {
            id: 'caffeineIntake',
            label: 'How many cups of tea, coffee or other caffeinated drinks do you usually have each day?',
            type: 'text',
            placeholder: 'e.g. 2 cups of coffee'
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
        title: 'Six Tastes — Shad Rasa (षड् रस)',
        description: 'Taste preferences that balance or aggravate your Doshas',
        fields: [
          {
            id: 'regularTastes',
            label: 'Which tastes are MOST present in your regular daily diet?',
            type: 'checkbox',
            options: [
              'Madhura (मधुर) — Sweet',
              'Amla (अम्ल) — Sour',
              'Lavana (लवण) — Salty',
              'Katu (कटु) — Pungent/Spicy',
              'Tikta (तिक्त) — Bitter',
              'Kashaya (कषाय) — Astringent',
              'Unsure'
            ]
          },
          {
            id: 'cravedTastes',
            label: 'Which tastes do you personally LOVE or crave the most?',
            type: 'checkbox',
            options: [
              'Madhura — Sweet',
              'Amla — Sour',
              'Lavana — Salty',
              'Katu — Pungent/Spicy',
              'Tikta — Bitter',
              'Kashaya — Astringent',
              'No particular preference'
            ]
          },
          { id: 'favoriteFoods', label: 'Please mention a few foods that you particularly love or crave.', type: 'text', placeholder: 'e.g. Chocolates, spicy curries, citrus fruits' },
          {
            id: 'dislikedFoods',
            label: 'Are there foods that you avoid, dislike or feel do not suit you? Please explain.',
            type: 'textarea',
            placeholder: 'e.g. Dairy causes congestion, raw salads cause gas...'
          }
        ]
      },
      {
        title: 'Daily Routine & Natural Urges — Dinacharya & Vega',
        description: 'Physical activity, restorative habits, and response to bodily urges',
        fields: [
          { id: 'regularWakeTime', label: 'What time do you normally wake?', type: 'time' },
          {
            id: 'exerciseFrequency',
            label: 'How often do you exercise?',
            type: 'radio',
            options: ['Most days', '3–4 times/week', '1–2 times/week', 'Occasionally', 'Rarely/never']
          },
          { id: 'exerciseType', label: 'What type of physical activity do you usually do?', type: 'text', placeholder: 'e.g. Walking, yoga, gym, swimming' },
          { id: 'sittingHours', label: 'Approximately how many hours per day do you spend sitting?', type: 'text', placeholder: 'e.g. 6-8 hours' },
          {
            id: 'ayurvedicPractices',
            label: 'Which do you regularly practice?',
            type: 'checkbox',
            options: [
              'Yoga',
              'Meditation',
              'Pranayama/breathwork',
              'Walking',
              'Tongue scraping',
              'Oil pulling',
              'Abhyanga/self-massage',
              'Nasya',
              'None',
              'Other'
            ]
          },
          {
            id: 'suppressUrges',
            label: 'Do you regularly suppress or postpone natural bodily urges (hunger, thirst, urination, etc.)?',
            type: 'radio',
            options: ['Yes', 'No', 'Sometimes', 'Unsure']
          },
          { id: 'suppressedUrgesList', label: 'If yes/sometimes, which natural urges do you commonly suppress or postpone?', type: 'textarea' },
          {
            id: 'suppressionReason',
            label: 'Why do you usually suppress/postpone them?',
            type: 'checkbox',
            options: [
              'Work',
              'Travel',
              'Meetings',
              'Social embarrassment',
              'Lack of access to a toilet/private space',
              'Habit',
              'I do not want to interrupt what I am doing',
              'I tend to ignore bodily signals',
              'Other'
            ]
          },
          {
            id: 'discomfortAfterSuppression',
            label: 'Do you notice any discomfort or symptoms after suppressing a natural urge?',
            type: 'radio',
            options: ['No', 'Yes', 'Unsure']
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Mind, Sleep, Energy & Constitution',
    shortTitle: 'Mind & Constitution',
    description: 'Mental wellbeing, sleep patterns (Nidra), bodily constitution (Prakriti), and health story.',
    icon: 'moon',
    subsections: [
      {
        title: 'Sleep Patterns — Nidra',
        description: 'Restorative sleep quality and disturbances',
        fields: [
          { id: 'bedtime', label: 'Usual Bedtime', type: 'time' },
          { id: 'wakeTime', label: 'Usual Waking Time', type: 'time' },
          { id: 'sleepHours', label: 'Approximately how many hours do you sleep?', type: 'text', placeholder: 'e.g. 7-8 hours' },
          {
            id: 'sleepQuality',
            label: 'Rate your overall sleep quality:',
            type: 'scale',
            min: 0,
            max: 10,
            minLabel: 'Very poor',
            maxLabel: 'Excellent',
            defaultValue: 6
          },
          {
            id: 'sleepDisturbances',
            label: 'Do you experience:',
            type: 'checkbox',
            options: [
              'Difficulty falling asleep',
              'Frequent waking',
              'Waking around the same time each night',
              'Early morning waking',
              'Light sleep',
              'Very deep/heavy sleep',
              'Vivid dreams',
              'Nightmares',
              'Snoring',
              'Known sleep apnea',
              'Daytime sleepiness',
              'Difficulty waking',
              'None'
            ]
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
        title: 'Energy, Mind & Stress Levels',
        description: 'Subjective vitality, clarity, and stress responses',
        fields: [
          { id: 'currentEnergy', label: 'Current Energy (0–10):', type: 'scale', min: 0, max: 10, minLabel: 'Low', maxLabel: 'High', defaultValue: 6 },
          { id: 'currentStress', label: 'Current Stress (0–10):', type: 'scale', min: 0, max: 10, minLabel: 'Low', maxLabel: 'High', defaultValue: 5 },
          { id: 'mentalClarity', label: 'Mental Clarity (0–10):', type: 'scale', min: 0, max: 10, minLabel: 'Low', maxLabel: 'High', defaultValue: 6 },
          { id: 'overallWellbeing', label: 'Overall Wellbeing (0–10):', type: 'scale', min: 0, max: 10, minLabel: 'Low', maxLabel: 'High', defaultValue: 6 },
          {
            id: 'stressResponses',
            label: 'Under stress, what are you most likely to experience?',
            type: 'checkbox',
            options: [
              'Worry',
              'Anxiety/fear',
              'Racing thoughts',
              'Difficulty sleeping',
              'Irritability',
              'Anger/frustration',
              'Impatience',
              'Emotional eating',
              'Withdrawal',
              'Low motivation',
              'Heaviness/lethargy',
              'Other'
            ]
          },
          { id: 'stressSources', label: 'What are the main sources of stress in your life at present?', type: 'textarea', placeholder: 'Work, relationships, finances, family...' }
        ]
      },
      {
        title: 'Health Story',
        description: 'Personal health journey and readiness for change',
        fields: [
          { id: 'lastFeltHealthy', label: 'When did you last feel genuinely healthy and well? What was different at that time?', type: 'textarea' },
          { id: 'contributingFactors', label: 'What do you feel is contributing most to your current health concerns?', type: 'textarea' },
          {
            id: 'readinessForChange',
            label: 'How ready are you to make dietary and lifestyle changes if recommended?',
            type: 'scale',
            min: 0,
            max: 10,
            minLabel: 'Not ready',
            maxLabel: 'Very ready',
            defaultValue: 8
          }
        ]
      },
      {
        title: 'Natural Constitution — Prakriti',
        description: 'Answer according to how you have naturally been for most of your adult life',
        fields: [
          { id: 'bodyFrame', label: 'Natural body frame:', type: 'radio', options: ['Thin/light', 'Medium', 'Broad/solid'] },
          { id: 'weightTendency', label: 'Weight tendency:', type: 'radio', options: ['Difficult to gain', 'Relatively stable', 'Gains easily'] },
          { id: 'skinType', label: 'Skin:', type: 'radio', options: ['Dry/rough', 'Warm/sensitive/prone to redness', 'Soft/smooth/oily', 'Combination'] },
          { id: 'hairType', label: 'Hair:', type: 'radio', options: ['Dry/coarse/frizzy', 'Fine/soft/prone to early greying or thinning', 'Thick/oily/lustrous', 'Mixed'] },
          { id: 'bodyTemperature', label: 'Body temperature:', type: 'radio', options: ['Usually colder than others', 'Usually warmer than others', 'Generally comfortable', 'Variable'] },
          { id: 'temperament', label: 'Natural temperament:', type: 'radio', options: ['Enthusiastic/creative/changeable', 'Driven/focused/intense', 'Calm/patient/steady', 'Mixture'] }
        ]
      },
      {
        title: "Women's Health (If Applicable)",
        description: 'Hormonal and menstrual health indicators (skip if not applicable)',
        fields: [
          {
            id: 'reproductiveStatus',
            label: 'Are you currently:',
            type: 'radio',
            options: ['Menstruating', 'Pregnant', 'Breastfeeding', 'Perimenopausal', 'Menopausal', 'Postmenopausal', 'Not applicable']
          },
          {
            id: 'cycleRegularity',
            label: 'If menstruating, are your cycles generally:',
            type: 'radio',
            options: ['Regular', 'Irregular', 'Unsure']
          },
          {
            id: 'menstrualSymptoms',
            label: 'Do you experience:',
            type: 'checkbox',
            options: [
              'Pain/cramps',
              'Clots',
              'PMS',
              'Irritability',
              'Anxiety',
              'Low mood',
              'Headaches/migraines',
              'Bloating',
              'Breast tenderness',
              'Food cravings',
              'Fatigue',
              'None',
              'Other'
            ]
          },
          {
            id: 'womensHealthNotes',
            label: 'Please share any menstrual, pregnancy, fertility, or menopausal concerns relevant to your consultation.',
            type: 'textarea'
          }
        ]
      }
    ]
  }
];

export const CONSENT_SECTION = {
  title: 'Consent & Legal Declaration',
  description: 'Please review and confirm the statements below to complete your pre-consultation assessment.',
  fields: [
    {
      id: 'consentStatements',
      label: 'Consent & Declaration Statements',
      type: 'checkbox',
      required: true,
      options: [
        'The information I have provided is accurate to the best of my knowledge.',
        'I have disclosed my current medicines, supplements, allergies and relevant medical conditions.',
        'I understand that an Ayurvedic consultation does not replace necessary medical diagnosis, emergency care or treatment.',
        'I will not stop or alter prescribed medication without consulting the appropriately qualified prescribing healthcare professional.',
        'I understand that symptoms requiring urgent medical attention should be assessed through appropriate medical services rather than waiting for an Ayurvedic consultation.',
        'I consent to this information being reviewed for the purpose of my Ayurvedic consultation, subject to the practitioner’s applicable privacy and data-handling practices.'
      ]
    },
    { id: 'consentFullName', label: 'Full Name (Digital Signature)', type: 'text', required: true, placeholder: 'Type your full legal name' },
    { id: 'consentDate', label: 'Date', type: 'date', required: true }
  ]
};

