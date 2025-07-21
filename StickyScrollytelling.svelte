<script>
  import { onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  // Scroll tracking
  let activeStep = 0;
  let steps = [
    {
      id: 0,
      title: "The Wealth Gap Over Time",
      text: `From the roaring 20s to today's digital age, wealth disparity paints a vivid tale.`,
      highlightYear: 1920
    },
    {
      id: 1,
      title: "Post-War Boom and Inequality",
      text: `Economic growth exploded post-WWII, but inequality crept back slowly.`,
      highlightYear: 1950
    },
    {
      id: 2,
      title: "Late 20th Century Surge",
      text: `The 1980s ushered in policies widening the wealth chasm — the gap exploded.`,
      highlightYear: 1980
    },
    {
      id: 3,
      title: "Modern Day Divide",
      text: `Technology, globalization — complexity and a widening chasm, from here to now.`,
      highlightYear: 2020
    },
  ];

  // Wealth Gap Index over years (fake data for demo)
  const data = [
    { year: 1920, gap: 65 },
    { year: 1950, gap: 45 },
    { year: 1980, gap: 70 },
    { year: 2020, gap: 85 },
  ];

  // Animated value for wealth gap highlight
  let highlightGap = tweened(data[0].gap, { duration: 800, easing: cubicOut });

  // Update highlight on activeStep change
  $: if (steps[activeStep]) {
    const targetGap = data.find(d => d.year === steps[activeStep].highlightYear)?.gap || data[0].gap;
    highlightGap.set(targetGap);
  }

  // IntersectionObserver to track which step is active
  onMount(() => {
    const stepEls = document.querySelectorAll('.step');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeStep = +entry.target.dataset.index;
          }
        });
      },
      { threshold: 0.5 }
    );

    stepEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  });
</script>

<style>
  .container {
    display: flex;
    max-width: 900px;
    margin: 0 auto;
    gap: 2rem;
    padding: 2rem 1rem;
  }

  .sticky-visual {
    position: sticky;
    top: 2rem;
    flex: 1;
    height: 300px;
    background: var(--color-light-gray, #f0f0f0);
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: monospace;
    font-size: 1.25rem;
  }

  .steps {
    flex: 1;
  }

  .step {
    margin-bottom: 150px;
    border-left: 4px solid transparent;
    padding-left: 1rem;
    transition: border-color 0.3s;
  }

  .step.active {
    border-left-color: var(--color-primary, #007acc);
  }

  h2 {
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p {
    color: #555;
    line-height: 1.5;
  }
</style>

<div class="container">
  <div class="sticky-visual" aria-live="polite" aria-atomic="true">
    <div>Year: <strong>{steps[activeStep]?.highlightYear}</strong></div>
    <div style="margin-top: 1rem;">
      Wealth Gap Index:
      <strong>
        {$highlightGap.toFixed(1)}
      </strong>
      <br />
      <small>(Lower is better)</small>
    </div>
    <svg width="100%" height="100" viewBox="0 0 400 100" aria-hidden="true" style="margin-top: 1rem;">
      <!-- Background line -->
      <line x1="20" y1="50" x2="380" y2="50" stroke="#ccc" stroke-width="8" stroke-linecap="round" />
      <!-- Highlight circle moves along the line based on gap -->
      <circle
        cx="{20 + (($highlightGap - 40) / 50) * 360}"
        cy="50"
        r="12"
        fill="var(--color-primary, #007acc)"
        style="transition: cx 0.8s cubic-bezier(0.22, 1, 0.36, 1);"
      />
    </svg>
  </div>

  <div class="steps" role="list">
    {#each steps as step, i}
      <section
        class="step {activeStep === i ? 'active' : ''}"
        data-index="{i}"
        role="listitem"
        tabindex="0"
        aria-current={activeStep === i ? 'true' : 'false'}
      >
        <h2>{step.title}</h2>
        <p>{step.text}</p>
      </section>
    {/each}
  </div>
</div>
