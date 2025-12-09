<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(function(reg) {
      console.log('Service Worker registrado:', reg);
    })
    .catch(function(err) {
      console.log('Error al registrar el Service Worker:', err);
    });
}
</script>
