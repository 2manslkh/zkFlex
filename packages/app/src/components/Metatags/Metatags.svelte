<!-- src/components/MetaTags.svelte -->
<script lang="ts">
  export let title = 'Default Title';
  export let description = 'Default description';
  export let imageUrl = 'https://zkflex.lol/noun/a';
  export let url = 'https://zkflex.lol';

  // Update or create a meta tag
  function setMeta(property: string, content: string, propName: string = 'content') {
    let selector =
      property.startsWith('og:') || property.startsWith('twitter:')
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
    let element = document.head.querySelector(selector);
    if (element) {
      element.setAttribute(propName, content);
    } else {
      element = document.createElement('meta');
      element.setAttribute(
        property.startsWith('og:') || property.startsWith('twitter:') ? 'property' : 'name',
        property,
      );
      element.setAttribute(propName, content);
      document.head.appendChild(element);
    }
  }

  // Reactive statements to update tags when props change
  $: setMeta('og:title', title);
  $: setMeta('og:description', description);
  $: setMeta('og:image', imageUrl);
  $: setMeta('og:image:width', '1200');
  $: setMeta('og:image:height', '600');
  $: setMeta('og:url', url);
  $: setMeta('og:type', 'website');
  $: setMeta('twitter:card', 'summary_large_image');
  $: setMeta('twitter:title', title);
  $: setMeta('twitter:description', description);
  $: setMeta('twitter:image', imageUrl);
</script>
