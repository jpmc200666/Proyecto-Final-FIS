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
              Creando las camisetas que sueñas con calidad Premium y diseños unicos desde 2019.
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
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/custom-design" className="hover:text-white">
                  Herramienta de Diseño
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Soporte</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/help" className="hover:text-white">
                  Atencion al Cliente
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white">
                  Informacion de Envio
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white">
                  Devoluciones
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="hover:text-white">
                  Guia de Tallas
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contactanos!
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
                  Acerca de Nosotros
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Trabaja con Nosotros
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Como cuidamos de tu privacidad
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terminos y Condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">CopyRight © 2019-2024 Estampate!.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Aceptamos:</span>
            <div className="flex space-x-2">
              <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">VISA</div>
              <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">MC</div>
              <div className="w-8 h-5 bg-gray-700 rounded text-xs flex items-center justify-center">Nequi</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
