export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border-soft)] bg-[var(--background)] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm sm:text-base text-[var(--text-muted)]">
              &copy; {currentYear} Aesthetic Runs. Run in style.
            </p>
          </div>
          <div className="flex gap-6 sm:gap-8">
            <a
              href="/terms"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
            >
              Terms
            </a>
            <a
              href="/privacy"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
