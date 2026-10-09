/**
 * Crop Advisor knowledge base containing safe, educational agricultural advice
 * for Indian staple crops (Rice, Wheat, Maize, Cotton, Pulses).
 *
 * NOTE: Does NOT contain fabricated chemical pesticide dosages or unverified commercial brands.
 * All guidance follows standard ICAR / Krishi Vigyan Kendra (KVK) agronomic extension practices.
 */

export const ADVISORY_CROPS = [
  { id: 'rice', name: 'Rice / Paddy (धान)', icon: 'Droplets' },
  { id: 'wheat', name: 'Wheat (गेहूं)', icon: 'Sprout' },
  { id: 'maize', name: 'Maize (मक्का)', icon: 'Sun' },
  { id: 'cotton', name: 'Cotton (कपास)', icon: 'CloudSun' },
  { id: 'pulses', name: 'Pulses / Gram (दालें / चना)', icon: 'Sprout' }
];

export const ADVISORY_GROWTH_STAGES = [
  { id: 'seedling', label: 'Seedling / Germination Stage (अंकुरण अवस्था)' },
  { id: 'vegetative', label: 'Vegetative / CRI Stage (वानस्पतिक / जड़ विकास)' },
  { id: 'flowering', label: 'Tillering / Flowering Stage (कल्ले / फूल आना)' },
  { id: 'grain_filling', label: 'Grain Filling / Pod Stage (दाना भरना / फली बनना)' },
  { id: 'maturity', label: 'Maturity / Harvest Stage (पकाई अवस्था)' }
];

export const ADVISORY_CONCERNS = [
  { id: 'yellowing', label: 'Yellowing Leaves (पत्तियों का पीला पड़ना)', icon: 'AlertTriangle' },
  { id: 'irrigation', label: 'Irrigation & Water Stress (पानी की कमी / जलभराव)', icon: 'Droplets' },
  { id: 'pests', label: 'Pest Damage & Insects (कीट या कीड़ा प्रकोप)', icon: 'Bug' },
  { id: 'weeds', label: 'Weed Growth (खरपतवार समस्या)', icon: 'Scissors' },
  { id: 'nutrient', label: 'Nutrient Deficiency (पोषक तत्वों की कमी)', icon: 'FlaskConical' },
  { id: 'stunting', label: 'Poor Growth / Stunting (फसल की रुकती वृद्धि)', icon: 'TrendingDown' }
];

export const CROP_ADVISORY_MATRIX = {
  // RICE / PADDY
  rice: {
    yellowing: {
      title: 'Rice Leaf Yellowing Advisory (धान में पीलापन)',
      whatToCheck: [
        'Check lower vs upper leaves: Lower leaf yellowing usually indicates Nitrogen (N) deficiency; upper young leaf yellowing suggests Zinc or Iron deficiency.',
        'Inspect leaf undersides for sucking pests like Brown Plant Hopper (BPH) or Green Leafhopper.',
        'Examine root health: Brown or foul-smelling roots indicate water stagnation/root rot; light brown to white roots mean healthy aeration.'
      ],
      whatToNext: [
        'Ensure proper field drainage if standing water is stagnant and anaerobic.',
        'Apply well-decomposed organic manure or neem-coated urea in split doses as per local KVK package of practices.',
        'Perform a simple soil pH test if yellowing is widespread across the field plot.'
      ],
      whatToAvoid: [
        'Avoid applying heavy synthetic chemical nitrogen during continuous rainfall or standing flooded conditions.',
        'Do not apply broad-spectrum chemical insecticides without identifying the exact insect pest species.'
      ],
      seekHelpWhen: [
        'Yellowing spreads rapidly into orange-brown leaf tips with bacterial ooze symptoms (Bacterial Leaf Blight suspicion).',
        'More than 15% of plants show severe stunting or hopper-burn patches.'
      ]
    },
    irrigation: {
      title: 'Rice Irrigation & Water Management Advisory (धान में पानी प्रबंधन)',
      whatToCheck: [
        'Maintain 2-5 cm standing water during tillering and panicle initiation stages.',
        'Check soil cracking: Hairline surface cracks are safe for alternate wetting & drying (AWD), but deep soil cracking causes root tip injury.'
      ],
      whatToNext: [
        'Adopt Alternate Wetting and Drying (AWD) water management to conserve water and promote deeper root growth.',
        'Drain field 10-14 days prior to anticipated harvest to facilitate uniform grain ripening.'
      ],
      whatToAvoid: [
        'Avoid complete drying of soil during flowering and milky grain stage; moisture stress at flowering causes chaffy grains.',
        'Do not keep excessive deep water (> 10 cm) continuously during early tillering.'
      ],
      seekHelpWhen: [
        'Severe canal water scarcity coincides with critical flowering stage; contact local irrigation department or KVK officer for drought mitigation advice.'
      ]
    },
    pests: {
      title: 'Rice Pest Management Advisory (धान में कीट प्रबंधन)',
      whatToCheck: [
        'Inspect stem bases for Stem Borer entry holes and "dead hearts" (withered central tillers) or "white heads".',
        'Look for leaf folder webbing where leaf blades are folded longitudinally.',
        'Check water line on stems for Brown Plant Hopper colonies.'
      ],
      whatToNext: [
        'Install light traps or pheromone traps (4-5 per acre) for early monitoring of adult stem borer moths.',
        'Release Trichogramma egg parasitoids or spray bio-pesticides like Neem Seed Kernel Extract (NSKE 5%) if pest threshold is low.',
        'Drain field water for 2-3 days to disturb Brown Plant Hopper nymph microclimate.'
      ],
      whatToAvoid: [
        'Avoid indiscriminate spraying of pyrethroid chemicals which kill natural pest predators (spiders, mirid bugs).',
        'Do not use excess nitrogen fertilizer which creates soft succulent tissue favored by pests.'
      ],
      seekHelpWhen: [
        'Dead heart symptoms exceed 10% of total tillers or hopper-burn spots appear in multiple field patches.'
      ]
    },
    weeds: {
      title: 'Rice Weed Control Advisory (धान में खरपतवार नियंत्रक)',
      whatToCheck: [
        'Identify grass weeds (Echinochloa / Sanwa), sedges (Cyperus / Motha), and broadleaf weeds.',
        'Check water depth in field; 3-5 cm continuous standing water suppresses weed germination.'
      ],
      whatToNext: [
        'Perform mechanical weeding using a cono-weeder or rotary weeder 15-20 days after transplanting.',
        'Use recommended pre-emergence or post-emergence herbicides strictly adhering to KVK label instructions and water volume.'
      ],
      whatToAvoid: [
        'Do not allow weeds to flower and drop seeds back into the paddy field soil.',
        'Avoid spraying herbicides during strong winds or rain forecast.'
      ],
      seekHelpWhen: [
        'Herbicide-resistant weeds (e.g. wild rice or resistant Echinochloa species) dominate despite standard weeding.'
      ]
    },
    nutrient: {
      title: 'Rice Nutrient Deficiency Advisory (धान में पोषक तत्व)',
      whatToCheck: [
        'Rusty brown spots on leaves indicate Zinc deficiency (Khaira disease).',
        'Pale green leaves across the whole plant indicate Nitrogen or Sulfur deficiency.'
      ],
      whatToNext: [
        'Soil test your field plot at the nearest government soil testing laboratory.',
        'Apply recommended basal doses of N-P-K along with Zinc Sulfate as advised by local package of practices.'
      ],
      whatToAvoid: [
        'Do not mix Zinc Sulfate directly with Phosphatic fertilizers (DAP) during application as it causes chemical precipitation.'
      ],
      seekHelpWhen: [
        'Symptoms persist 10 days after corrective nutrient application.'
      ]
    },
    stunting: {
      title: 'Rice Stunting Advisory (धान में पौधों की रुकी वृद्धि)',
      whatToCheck: [
        'Check root system for gall knot nematodes or root rot fungi.',
        'Look for leaf yellowing or twisting associated with viral diseases (Rice Tungro virus).'
      ],
      whatToNext: [
        'Improve field soil aeration by temporary draining and light inter-cultivation.',
        'Apply well-rotted Farm Yard Manure (FYM) to improve soil organic carbon.'
      ],
      whatToAvoid: [
        'Do not over-fertilize stunted plants with heavy nitrogen in poor drainage soil.'
      ],
      seekHelpWhen: [
        'Stunting affects > 15% of the field with dark green twisted leaves (Suspected dwarf viral infection).'
      ]
    }
  },

  // WHEAT
  wheat: {
    yellowing: {
      title: 'Wheat Leaf Yellowing Advisory (गेहूं में पत्तियों का पीलापन)',
      whatToCheck: [
        'Check if yellowing occurs after first irrigation (CRI stage) - often caused by temporary waterlogging or Nitrogen leaching.',
        'Examine lower leaves for yellow striping or orange powder spots (Yellow Rust / Stripe Rust).',
        'Inspect soil moisture and compaction near root zone.'
      ],
      whatToNext: [
        'Ensure quick drainage of excess irrigation water after first watering (21 days after sowing).',
        'Top-dress nitrogen (Urea) in split doses only after standing water has drained completely.'
      ],
      whatToAvoid: [
        'Avoid heavy flood irrigation on heavy clay soils during early seedling stage.',
        'Do not ignore orange-yellow powder spots on leaf blades during cool humid February weather.'
      ],
      seekHelpWhen: [
        'Bright yellow powder spots (Yellow Rust) appear on leaves during cool temperature (10-20°C); report immediately to district agriculture extension officer.'
      ]
    },
    irrigation: {
      title: 'Wheat Irrigation Advisory (गेहूं की सिंचाई सारणी)',
      whatToCheck: [
        'Critical irrigation stages: Crown Root Initiation (CRI at 21 days), Tillering (40-45 days), Flowering (70-75 days), and Milk/Grain filling (90-95 days).',
        'Check soil moisture at 15 cm depth before scheduling next watering.'
      ],
      whatToNext: [
        'Prioritize CRI stage irrigation (20-25 days after sowing) as missing CRI water reduces tillers severely.',
        'Use sprinkler irrigation if soil is sandy or undulating.'
      ],
      whatToAvoid: [
        'Avoid heavy irrigation during high wind days near maturity to prevent crop lodging (falling over).'
      ],
      seekHelpWhen: [
        'Unseasonal warm temperatures occur during grain filling stage (Terminal Heat Stress).'
      ]
    },
    pests: {
      title: 'Wheat Pest & Termite Control Advisory (गेहूं में दीमक व कीट)',
      whatToCheck: [
        'Check drying plants near field borders for termite attack on roots.',
        'Inspect ears/heads for aphid colonies during February-March.'
      ],
      whatToNext: [
        'Treat seeds with recommended bio-pesticides or seed treatment before sowing.',
        'Conserve natural predators like ladybird beetles which consume aphid colonies.'
      ],
      whatToAvoid: [
        'Do not leave un-decayed stubble or fresh manure in the field which attracts termites.'
      ],
      seekHelpWhen: [
        'Aphid population exceeds 5-10 aphids per ear head on over 20% of plants.'
      ]
    },
    weeds: {
      title: 'Wheat Weed Management Advisory (गेहूं में मंडूसी व खरपतवार)',
      whatToCheck: [
        'Identify Phalaris minor (Gulli Danda / Mandusi) grass weeds and broadleaf weeds (Bathua).',
        'Check if weeds are emerging alongside wheat seedlings.'
      ],
      whatToNext: [
        'Rotate crops with berseem, mustard, or potato to break Phalaris minor weed seed cycle.',
        'Apply KVK recommended post-emergence herbicides 30-35 days after sowing using flat fan nozzles.'
      ],
      whatToAvoid: [
        'Do not repeat the exact same chemical herbicide every year to prevent herbicide resistance development.'
      ],
      seekHelpWhen: [
        'Phalaris minor weeds fail to die after standard herbicide application (suspected herbicide resistance).'
      ]
    },
    nutrient: {
      title: 'Wheat Micronutrient & Nitrogen Advisory (गेहूं में पोषण)',
      whatToCheck: [
        'Yellowing between veins on upper leaves indicates Manganese or Iron deficiency.',
        'General light green canopy indicates Nitrogen deficiency.'
      ],
      whatToNext: [
        'Foliar spray of 0.5% Manganese Sulfate or Zinc Sulfate as advised by local agriculture extension guidelines.'
      ],
      whatToAvoid: [
        'Avoid excessive urea top-dressing after crop reaches flowering stage.'
      ],
      seekHelpWhen: [
        'Nutrient deficiency symptoms cover wide contiguous field patches.'
      ]
    },
    stunting: {
      title: 'Wheat Growth Stunting Advisory (गेहूं की रुकी वृद्धि)',
      whatToCheck: [
        'Examine root depth and soil hardpan layer.',
        'Check for salinity or high soil pH (alkaline soil).'
      ],
      whatToNext: [
        'Apply gypsum or organic manure in alkaline soils based on soil test reports.',
        'Ensure deep summer plowing to break hard plow pans.'
      ],
      whatToAvoid: [
        'Do not sow seed deeper than 5 cm in cold moist soil.'
      ],
      seekHelpWhen: [
        'Severe plant stunting covers more than 10% of field area.'
      ]
    }
  },

  // MAIZE
  maize: {
    yellowing: {
      title: 'Maize Leaf Yellowing & Health Advisory (मक्का में पीलापन)',
      whatToCheck: [
        'V-shaped yellowing starting from tip along midrib indicates Nitrogen deficiency.',
        'Check for waterlogging around maize stem bases (maize is highly sensitive to standing water).'
      ],
      whatToNext: [
        'Ensure effective field drainage furrows between maize rows.',
        'Apply top-dressed nitrogen near root zone after draining standing rainwater.'
      ],
      whatToAvoid: [
        'Do not allow standing water to accumulate for more than 12 hours around young maize plants.'
      ],
      seekHelpWhen: [
        'Leaves develop water-soaked tan lesions (Turcicum leaf blight suspicion).'
      ]
    },
    pests: {
      title: 'Maize Fall Armyworm & Stem Borer Advisory (मक्का में फॉल आर्मीवॉर्म)',
      whatToCheck: [
        'Inspect central leaf whorls for saw-dust like frass and ragged pin-holes (Fall Armyworm symptom).',
        'Look for stem borer shot-holes on leaf blades.'
      ],
      whatToNext: [
        'Drop bio-agents like Metarhizium or neem formulation / sand mixture directly into leaf whorls.',
        'Install pheromone traps for monitoring Fall Armyworm adult moth flights.'
      ],
      whatToAvoid: [
        'Avoid late sowing of maize which exposes young crop to peak Fall Armyworm populations.'
      ],
      seekHelpWhen: [
        'Fall Armyworm damage affects > 10% of young whorls in seedling or knee-high stage.'
      ]
    },
    irrigation: {
      title: 'Maize Irrigation Advisory (मक्का सिंचाई प्रबंधन)',
      whatToCheck: [
        'Critical moisture stages: Knee-high stage, Tasseling/Silking stage, and Cob development.',
        'Check leaf rolling during afternoon heat.'
      ],
      whatToNext: [
        'Irrigate using ridge and furrow method to save water and prevent stem rot.',
        'Mulch crop rows with organic crop residues to retain soil moisture.'
      ],
      whatToAvoid: [
        'Avoid moisture stress during silking and cob filling stage.'
      ],
      seekHelpWhen: [
        'Prolonged drought occurs during tasseling.'
      ]
    },
    weeds: {
      title: 'Maize Weed Advisory (मक्का खरपतवार)',
      whatToCheck: ['Identify annual grasses and broadleaf weeds in early 30 days.'],
      whatToNext: ['Perform earthing-up operation at 25-30 days to bury weeds and support stems.'],
      whatToAvoid: ['Do not damage maize roots during late mechanical cultivation.'],
      seekHelpWhen: ['Weeds outgrow young maize seedlings.']
    },
    nutrient: {
      title: 'Maize Nutrient Advisory (मक्का पोषण)',
      whatToCheck: ['Purple leaf margins indicate Phosphorus deficiency in cold soils.'],
      whatToNext: ['Apply balanced basal DAP/NPK as per soil test recommendations.'],
      whatToAvoid: ['Do not apply uncomposted manure close to seed rows.'],
      seekHelpWhen: ['Severe purple or yellow leaf discoloration occurs.']
    },
    stunting: {
      title: 'Maize Stunting Advisory (मक्का की वृद्धि)',
      whatToCheck: ['Inspect roots for grub feeding damage or nematodes.'],
      whatToNext: ['Earthing up and applying organic carbon manure.'],
      whatToAvoid: ['Avoiding waterlogging.'],
      seekHelpWhen: ['Plant mortality exceeds 10%.']
    }
  },

  // COTTON
  cotton: {
    yellowing: {
      title: 'Cotton Leaf Yellowing & Reddening Advisory (कपास में पीलापन व लाल पत्ती)',
      whatToCheck: [
        'Check leaf reddening or yellowing: Reddening in cotton (Lal Patti) is often linked to Magnesium deficiency, cold night temperatures, or root stress.',
        'Inspect lower leaves for sucking pest attack (Jassids, Whitefly).'
      ],
      whatToNext: [
        'Apply foliar spray of 1% Magnesium Sulfate + 1% Urea as recommended by state agricultural university package of practices.',
        'Maintain balanced irrigation during boll formation.'
      ],
      whatToAvoid: [
        'Avoid waterlogging during boll development stage.'
      ],
      seekHelpWhen: [
        'Leaves show leaf curl virus symptoms (thickened veins, upward leaf curling).'
      ]
    },
    pests: {
      title: 'Cotton Pink Bollworm & Whitefly Advisory (कपास में गुलाबी सुंडी व सफेद मक्खी)',
      whatToCheck: [
        'Inspect flowers for "rosette" appearance (Pink bollworm attack).',
        'Check leaf undersides for Whitefly adults and sticky honeydew deposits.'
      ],
      whatToNext: [
        'Install yellow sticky traps (8-10 per acre) for whitefly monitoring.',
        'Pluck and destroy rosette flowers containing bollworm larvae.',
        'Spray neem-based formulations (NSKE 5%) at early pest detection.'
      ],
      whatToAvoid: [
        'Do not extend cotton crop beyond recommended season duration (avoid ratoon cotton).'
      ],
      seekHelpWhen: [
        'Whitefly count exceeds 6-8 adults per leaf or pink bollworm rosette flowers exceed 5%.'
      ]
    },
    irrigation: {
      title: 'Cotton Water Management Advisory (कपास सिंचाई)',
      whatToCheck: ['Check moisture at square formation and boll development.'],
      whatToNext: ['Adopt drip irrigation with fertigation for high efficiency.'],
      whatToAvoid: ['Avoid excessive water which causes flower drop.'],
      seekHelpWhen: ['Severe square shedding occurs due to drought.']
    },
    weeds: {
      title: 'Cotton Weed Control Advisory (कपास खरपतवार)',
      whatToCheck: ['Inspect inter-row space for weeds during first 60 days.'],
      whatToNext: ['Inter-cultivation with tractor or bullock hoe.'],
      whatToAvoid: ['Avoiding root injury during hoeing.'],
      seekHelpWhen: ['Weed infestation is dense.']
    },
    nutrient: {
      title: 'Cotton Potassium & Micronutrient Advisory (कपास पोषण)',
      whatToCheck: ['Check leaf margin burning (Potassium deficiency) during heavy boll load.'],
      whatToNext: ['Spray 1% Potassium Nitrate (13-0-45) during boll development.'],
      whatToAvoid: ['Avoiding excessive late nitrogen application.'],
      seekHelpWhen: ['Boll shedding is widespread.']
    },
    stunting: {
      title: 'Cotton Parawilt / Stunting Advisory (कपास में अचानक सुखाव)',
      whatToCheck: ['Check for sudden wilting after heavy rain following drought (Parawilt).'],
      whatToNext: ['Drench affected plant root zones with copper oxychloride as per KVK advice.'],
      whatToAvoid: ['Do not leave standing water in fields after dry spells.'],
      seekHelpWhen: ['Parawilt affects multiple plants simultaneously.']
    }
  },

  // PULSES / GRAM
  pulses: {
    yellowing: {
      title: 'Pulses Yellowing & Wilt Advisory (दालों व चने में पीलापन व उकठा)',
      whatToCheck: [
        'Check stem base and roots for dark brown vascular discoloration (Fusarium Wilt symptom).',
        'Inspect leaves for Yellow Mosaic Virus (YMV) transmitted by whitefly.'
      ],
      whatToNext: [
        'Remove and burn wilted plants to prevent fungal spore spread in soil.',
        'Control whitefly vectors using neem oil sprays.'
      ],
      whatToAvoid: [
        'Avoid sowing pulses continuously in the same field year after year; practice crop rotation.'
      ],
      seekHelpWhen: [
        'Fusarium wilt causes sudden dying of plants in expanding circular patches.'
      ]
    },
    pests: {
      title: 'Pulses Pod Borer (Helicoverpa) Advisory (चने में फली छेदक)',
      whatToCheck: [
        'Inspect pods for round entry holes made by Helicoverpa armigera larvae.',
        'Look for green caterpillars feeding on leaves or pods.'
      ],
      whatToNext: [
        'Install T-shaped bird perches (15-20 per acre) to encourage insectivorous birds.',
        'Apply HNPV (Nuclear Polyhedrosis Virus) or Bacillus thuringiensis (Bt) bio-insecticide.'
      ],
      whatToAvoid: [
        'Avoid broad-spectrum chemical sprays during peak honeybee pollination hours.'
      ],
      seekHelpWhen: [
        'Pod borer caterpillar count exceeds 1-2 larvae per meter row length.'
      ]
    },
    irrigation: {
      title: 'Pulses Moisture Management Advisory (दलहन सिंचाई)',
      whatToCheck: ['Pulses are sensitive to excess water; check for waterlogging.'],
      whatToNext: ['Provide light irrigation at pre-flowering and pod formation stages only if dry.'],
      whatToAvoid: ['Avoid heavy irrigation during active flowering stage as it causes flower drop.'],
      seekHelpWhen: ['Severe drought causes pod shriveling.']
    },
    weeds: {
      title: 'Pulses Weed Advisory (दलहन खरपतवार)',
      whatToCheck: ['Check weeds in first 30-40 days of slow initial growth.'],
      whatToNext: ['Hand weeding or wheel-hoe operation at 20 and 40 days after sowing.'],
      whatToAvoid: ['Do not neglect early weeding.'],
      seekHelpWhen: ['Weeds smother pulse crop canopy.']
    },
    nutrient: {
      title: 'Pulses Rhizobium & Phosphorus Advisory (दलहन पोषण)',
      whatToCheck: ['Check root nodules: Active Rhizobium nodules are pink inside when split open.'],
      whatToNext: ['Treat seeds with Rhizobium and PSB bio-fertilizer cultures before sowing.'],
      whatToAvoid: ['Avoid heavy nitrogen fertilizer application which reduces natural nitrogen fixation.'],
      seekHelpWhen: ['Root nodules are absent or pale white/green.']
    },
    stunting: {
      title: 'Pulses Root Rot / Stunting Advisory (दलहन जड़ सड़न)',
      whatToCheck: ['Check tap root for dry root rot or collar rot fungal lesions.'],
      whatToNext: ['Seed treatment with Trichoderma viride bio-fungicide.'],
      whatToAvoid: ['Do not sow seeds in wet cold un-aerated soil.'],
      seekHelpWhen: ['Root rot plant mortality exceeds 5%.']
    }
  }
};

/**
 * Returns specific advisory response for crop & concern combination.
 * Fallback to general educational advisory if exact key combination is unavailable.
 */
export const getCropAdvisory = (cropId, concernId) => {
  const cropData = CROP_ADVISORY_MATRIX[cropId];
  if (cropData && cropData[concernId]) {
    return cropData[concernId];
  }

  // Generic Agronomic Fallback Advisory
  return {
    title: 'General Agronomic Advisory (सामान्य कृषि परामर्श)',
    isGeneralFallback: true,
    whatToCheck: [
      'Observe overall field patterns: Are symptoms uniform across the entire field or confined to specific low-lying patches?',
      'Check plant leaves (top vs bottom), stem base, and root depth for physical injury, pest frass, or discoloration.',
      'Test soil moisture at 10-15 cm depth and note recent weather (rainfall, humidity, frost).'
    ],
    whatToNext: [
      'Take 3-4 clear photographs of affected leaves, stems, and whole plants under daylight.',
      'Practice cultural field hygiene: Remove severely diseased or infested crop residues.',
      'Consult your local Krishi Vigyan Kendra (KVK) or Block Agricultural Development Officer for official diagnosis.'
    ],
    whatToAvoid: [
      'Do not apply unverified chemical pesticides or fertilizer mixtures without expert advice.',
      'Avoid over-watering or deep flooding during plant stress periods.'
    ],
    seekHelpWhen: [
      'Symptom cause remains uncertain after basic physical inspection.',
      'Plant mortality or crop yield loss threat exceeds 10% of your farm plot.'
    ]
  };
};
