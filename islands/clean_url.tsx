// Clears the URL of any query parameters
export default function CleanURL() {
  return (
    <>
      <script>
        window.history.pushState('', '', '/');
      </script>
    </>
  );
}
