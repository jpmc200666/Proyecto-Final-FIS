import Link from "next/link"
import { Shirt, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shirt className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold">TeeShop</span>
            </Link>
            <p className="text-gray-400">
              Creating custom t-shirts with premium quality and unique designs since 2020.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/products" className="hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=vintage" className="hover:text-white">
                  Vintage
                </Link>
              </li>
              <li>
                <Link href="/products?category=minimalist" className="hover:text-white">
                  Minimalist
                </Link>
              </li>
              <li>
                <Link href="/products?category=artistic" className="hover:text-white">
                  Artistic
                </Link>
              </li>
              <li>
                <Link href="/custom-design" className="hover:text-white">
                  Custom Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-white">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 TeeShop. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">We accept:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">VISA</div>
              <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">MC</div>
              <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">AMEX</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
