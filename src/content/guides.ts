export interface GuideStep {
  label: string;
  text: string;
}

export interface Guide {
  slug: string;
  numeral: string;
  title: string;
  subtitle: string;
  frameCount: number;
  duration: string;
  intro: string;
  steps: GuideStep[];
  closing: string;
}

export const guides: Guide[] = [
  {
    slug: 'pour-over',
    numeral: 'I',
    title: 'Pour Over',
    subtitle: 'The Slow Vigil',
    frameCount: 145,
    duration: '4 min',
    intro:
      'No machine intervenes here. Only water, falling in a controlled spiral, and a bed of grounds surrendering their last secrets. Pour over is the most exposed of the rituals, every misstep visible, every good decision rewarded in clarity.',
    steps: [
      {
        label: 'Grind',
        text: 'Medium-fine, the texture of raw sugar. Uneven grounds mean uneven extraction, so consistency here decides everything downstream.'
      },
      {
        label: 'Bloom',
        text: 'Wet the grounds with twice their weight in water just off the boil. Wait thirty seconds while carbon dioxide escapes and the bed swells like something breathing.'
      },
      {
        label: 'Pour',
        text: 'Circle the water inward from the edge, never touching the filter directly. Keep the level steady, resisting the urge to rush the middle.'
      },
      {
        label: 'Draw-down',
        text: 'The last water should clear the bed in under four minutes total. Too fast and it tastes thin; too slow and it turns bitter.'
      }
    ],
    closing:
      'What remains is quiet and precise, a cup that rewards attention with brightness no machine can replicate.'
  },
  {
    slug: 'french-press',
    numeral: 'II',
    title: 'French Press',
    subtitle: 'Full Immersion',
    frameCount: 145,
    duration: '4 min',
    intro:
      'Here the grounds are never rushed past the water. They are held beneath it, submerged completely, forced to give up everything at once. Immersion brewing is blunt and honest, favoring body over nuance.',
    steps: [
      {
        label: 'Grind',
        text: 'Coarse, close to breadcrumbs. Fine particles slip through the mesh and cloud the cup, so err toward large.'
      },
      {
        label: 'Steep',
        text: 'Add water off the boil, stir once to break the crust, then leave it undisturbed for four minutes. Patience is the only technique required.'
      },
      {
        label: 'Break the crust',
        text: 'A layer of grounds and oil rises to the surface. Skim it gently before pressing so the finished brew stays clean.'
      },
      {
        label: 'Press',
        text: 'Push the plunger down slowly and evenly. Force it and you drag fines back into the liquid; go too slow and the brew keeps extracting past its peak.'
      }
    ],
    closing:
      'Decant immediately. Left standing, the grounds continue their work long after they should have stopped.'
  },
  {
    slug: 'aeropress',
    numeral: 'III',
    title: 'AeroPress',
    subtitle: 'Pressure and Brevity',
    frameCount: 145,
    duration: '2 min',
    intro:
      'A short, forceful ritual. Where pour over asks for patience, the AeroPress asks for speed and pressure, a compressed version of extraction that trades subtlety for control.',
    steps: [
      {
        label: 'Grind',
        text: 'Fine, near espresso texture, though the exact grind bends to whichever recipe you favor, inverted or upright.'
      },
      {
        label: 'Steep',
        text: 'Add water just off the boil, stir for ten seconds, and let the chamber sit for under a minute and a half.'
      },
      {
        label: 'Press',
        text: 'Apply steady downward pressure over twenty to thirty seconds. A hiss at the end signals the grounds have given up their last drop.'
      },
      {
        label: 'Dilute or not',
        text: 'What emerges is concentrated. Drink it as is, or lengthen it with hot water to the strength you prefer.'
      }
    ],
    closing:
      'Small, fast, forgiving of imprecision, the AeroPress rewards experimentation more than any other method here.'
  },
  {
    slug: 'moka-pot',
    numeral: 'IV',
    title: 'Moka Pot',
    subtitle: 'Stovetop Pressure',
    frameCount: 145,
    duration: '5 min',
    intro:
      'Water is forced upward through the grounds by steam pressure alone, no electricity, no filter paper, just a chamber, a basket, and heat. What comes out is dense, dark, and unmistakably its own category.',
    steps: [
      {
        label: 'Grind',
        text: 'Fine, but not powder, somewhere between espresso and standard drip. Too fine and the pot chokes; too coarse and the brew runs thin.'
      },
      {
        label: 'Fill',
        text: 'Water to the valve line in the base, grounds level but not tamped in the basket. Compression here restricts flow rather than helping it.'
      },
      {
        label: 'Heat',
        text: 'Medium heat, lid open, watching for the first thread of coffee climbing the spout. Rushing the heat scorches the grounds before they finish extracting.'
      },
      {
        label: 'Listen',
        text: 'A hissing, gurgling sound marks the end of the cycle. Pull the pot from heat the moment the sound changes to avoid drawing through the last bitter steam.'
      }
    ],
    closing:
      'Strong, syrupy, built for small cups, the moka pot brews closer to a concentrate than a coffee.'
  },
  {
    slug: 'espresso-machine',
    numeral: 'V',
    title: 'Espresso Machine',
    subtitle: 'Nine Bars of Force',
    frameCount: 145,
    duration: '30 sec',
    intro:
      'The most mechanical of the rituals, and the most exacting. Water at pressure, forced through a tightly packed disc of grounds in under a minute, every variable measured, every gram accounted for.',
    steps: [
      {
        label: 'Grind',
        text: 'Very fine, almost powdered, dialed in until extraction lands in the right window. Grind size here is the single most sensitive variable.'
      },
      {
        label: 'Dose and tamp',
        text: 'Distribute the grounds evenly in the basket, then tamp level and firm. An uneven bed channels water through the path of least resistance and ruins the shot.'
      },
      {
        label: 'Extract',
        text: 'Roughly twenty-five to thirty seconds from first drip to full yield. Watch the stream thin from dark to blonde as the extraction completes.'
      },
      {
        label: 'Taste and adjust',
        text: 'Sour means under-extracted, bitter means over-extracted. Grind finer or coarser and try again. Espresso is dialed in, not brewed on the first attempt.'
      }
    ],
    closing:
      'Dense, layered with crema, gone in three sips, espresso compresses the entire ritual into thirty seconds of pressure.'
  },
  {
    slug: 'cold-brew-tower',
    numeral: 'VI',
    title: 'Cold Brew Tower',
    subtitle: 'Patience Measured in Hours',
    frameCount: 145,
    duration: '12+ hrs',
    intro:
      'No heat, no urgency. Cold water drips through coarse grounds over half a day or longer, extracting slowly and selectively. What it lacks in acidity it gains in depth, a smoother, quieter cup built entirely on time.',
    steps: [
      {
        label: 'Grind',
        text: 'Coarse, coarser than French press. Cold extraction is inefficient by nature, so a larger surface-to-time ratio keeps the brew from turning muddy.'
      },
      {
        label: 'Load',
        text: 'Pack the grounds evenly into the chamber and set the drip rate to a slow, steady pulse, roughly one drop per second.'
      },
      {
        label: 'Wait',
        text: 'Twelve to twenty-four hours pass with almost no intervention. The tower does the work; your role is simply to leave it alone.'
      },
      {
        label: 'Store',
        text: 'Refrigerate the concentrate once brewing finishes. It keeps for weeks, growing slightly smoother with the first few days of rest.'
      }
    ],
    closing:
      'Serve over ice, diluted to taste. Cold brew is the one ritual measured in hours rather than minutes, a different relationship with time altogether.'
  }
];
