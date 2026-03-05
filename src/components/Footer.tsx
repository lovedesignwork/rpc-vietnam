export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-cream-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="font-serif text-xl text-white">Royal Phuket City Hotel</p>
            <p className="text-sm mt-1">154 Phang-Nga Rd., Muang, Phuket 83000, Thailand</p>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>&copy; {currentYear} Royal Phuket City Hotel. All rights reserved.</p>
            <p className="mt-1">Địa điểm MICE hàng đầu Phuket</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
