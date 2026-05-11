import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { 
  Menu, 
  Search, 
  ShoppingBag, 
  CheckCircle, 
  ChevronRight, 
  Verified, 
  ShoppingCart, 
  Truck, 
  Instagram, 
  Facebook, 
  MessageCircle,
  X,
  ChevronLeft,
  ChevronDown,
  ArrowRight,
  Trash2,
  Plus,
  Minus,
  Upload,
  Camera,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const DUPATTA_COLORS = [
  { name: 'PEACH', hex: '#F5C6A5', rgb: [245, 198, 165] },
  { name: 'WHITE', hex: '#FFFFFF', rgb: [255, 255, 255] },
  { name: 'BLACK', hex: '#000000', rgb: [0, 0, 0] },
  { name: 'NAVY BLUE', hex: '#1A2A44', rgb: [26, 42, 68] },
  { name: 'RED', hex: '#8B0000', rgb: [139, 0, 0] },
  { name: 'CHERRY RANI', hex: '#C2185B', rgb: [194, 24, 91] },
  { name: 'BEIGE', hex: '#E8D3B0', rgb: [232, 211, 176] },
  { name: 'ONION', hex: '#D8A7B1', rgb: [216, 167, 177] },
  { name: 'MAROON', hex: '#5A0F1C', rgb: [90, 15, 28] },
  { name: 'BOTTLE GREEN', hex: '#004225', rgb: [0, 66, 37] },
  { name: 'COFFEE', hex: '#4B3621', rgb: [75, 54, 33] },
  { name: 'CHIKOO', hex: '#A38068', rgb: [163, 128, 104] },
  { name: 'SAND BEIGE', hex: '#D6BFA9', rgb: [214, 191, 169] },
  { name: 'CAMEL TAN', hex: '#C19A6B', rgb: [193, 154, 107] },
  { name: 'ALMOND CREAM', hex: '#E8D0B8', rgb: [232, 208, 184] },
  { name: 'MOCHA MIST', hex: '#8B6F5A', rgb: [139, 111, 90] },
  { name: 'WALNUT BROWN', hex: '#5C4033', rgb: [92, 64, 51] },
  { name: 'TAUPE GREY', hex: '#8B8589', rgb: [139, 133, 137] },
  { name: 'ASH BROWN', hex: '#A1887F', rgb: [161, 136, 127] },
  { name: 'IVORY SAND', hex: '#F3E5C8', rgb: [243, 229, 200] },
  { name: 'COCOA DUST', hex: '#7B5E57', rgb: [123, 94, 87] },
  { name: 'STONE BEIGE', hex: '#C7B299', rgb: [199, 178, 153] },
  { name: 'ROSE PINK', hex: '#E8AAB1', rgb: [232, 170, 177] },
  { name: 'DUSTY MAUVE', hex: '#B784A7', rgb: [183, 132, 167] },
  { name: 'BLUSH NUDE', hex: '#D9A5A0', rgb: [217, 165, 160] },
  { name: 'SOFT LAVENDER', hex: '#C8B6D8', rgb: [200, 182, 216] },
  { name: 'VINTAGE ROSE', hex: '#B76E79', rgb: [183, 110, 121] },
  { name: 'POWDER PINK', hex: '#F2C1C1', rgb: [242, 193, 193] },
  { name: 'CORAL PEACH', hex: '#F7A98E', rgb: [247, 169, 142] },
  { name: 'PLUM WINE', hex: '#6D3B47', rgb: [109, 59, 71] },
  { name: 'BERRY ROSE', hex: '#A24D6F', rgb: [162, 77, 111] },
  { name: 'MAUVE ORCHID', hex: '#9F7AA5', rgb: [159, 122, 165] },
];

const getClosestColors = (targetRgb: [number, number, number]) => {
  return DUPATTA_COLORS.map(color => {
    const distance = Math.sqrt(
      Math.pow(color.rgb[0] - targetRgb[0], 2) +
      Math.pow(color.rgb[1] - targetRgb[1], 2) +
      Math.pow(color.rgb[2] - targetRgb[2], 2)
    );
    return { ...color, distance };
  }).sort((a, b) => a.distance - b.distance).slice(0, 3);
};

const IMAGES = {
  hero: 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777630227/ChatGPT_Image_May_1_2026_03_39_14_PM_lktrkn.png',
  spotlight: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUQ3V-dABjyijVZPzqki2EgNmhrEmHTLpTv8f-sNDZi10iDKuiVfqYTvxjQj8bPS7b8HDGtNYeWXSJecPVMw6mnkj7DO2JlOuVs44FJDv9RxsG45CR5a8ov2d1Sj9DOClmYIuBgxCipVuh-o6M3cg_y0ZoithD3EquIPr9l-fC3cYoUwZtnUYqYqrcRlSbXIjjqAr7ygjEPjkmbFBbzVsNdXfhCZ5eXahV1fVy8z52lCvWtWnfni0G3V8X4Om6BNVyuR0EKo5raQ',
  products: [
    {
      id: 1,
      name: 'Classic Zia Dupatta',
      price: '₹4,200.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgB3eZ7PMHKTdaZTLvecc9AjnrNrcbeH7bZBFm-_S1iDHOrxox1C7Vawvm1QomzNfCQ892J0s1IvEun4nO_m31rzX6vV1SAcSB873TXItzgJGUxCPCitmtttYHiBSA_d2AKNDL7H-v1NXh57udE7C0N4fstwjrK49ViO89WUIzx6NvslR9JhgUzf7xwvmTDcpEofKdlLQ-OlS0_nyDaU2qe1xh3d9awi1VZ23g4xZ0R63Xhx0EdZZOf_67sudpHrfLd-cqjkk8fQ'
    },
    {
      id: 2,
      name: 'Ethereal Ivory Dupatta',
      price: '₹5,800.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBq_Dj3d59OBqD66TfN-MuupvAxsI4VLgBiS8CmvmKMTf5gkQJIwVJw1Vs1c-N9h3uVvshlsiHRqGfNTKXPkBSVCwQ7o5w8M03xLCoHOuKsoz3fB2_f-OzuB3VX7RZFR6381LBIgljpug2qMyfGetBGYGSHhyM2VP_PVbMjT6ynFxQpEr8agnvvbHUePcYtRMQowqI7Akg7waS-NNZo_44GrYn8Yrtbdpb2HIRC66a_dALmQRmxHQCpiQHjumJp3OP7jfaGZHFcGA'
    },
    {
      id: 3,
      name: 'Royal Amber Malmal',
      price: '₹3,900.00',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaBw-0uq_IRNXkiBVRcURyIJ1IIgMbhaPGdmJFcVlXREUxeXwYOBUcUpJ6fQ11pgF--4FdJ10imKiXo-8wn9xJEOZjiLHebJwlZ-9RVdtQjEiw9fgixgHpSJGhdTOZa1B55FhegHyGmOq2V9ReMPZjnyQ0uId5cwPR-EQV24rb9IXbiuzuACA-MKYdRHoND9ryVlYTz4k5Rq1R96-DF46uvtfHEk3apPRjKoMTBfwODhUpv-8J4TYdrryFWtXsIYXhrFfrkDBkKg'
    }
  ]
};

const Header = ({ onPageChange, currentPage, cartCount = 0 }: { onPageChange: (page: string) => void, currentPage: string, cartCount?: number }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'collection', label: 'Collection' },
    { id: 'about', label: 'About' }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-surface/80 backdrop-blur-md border-b border-outline-variant py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className={`md:hidden transition-colors focus:outline-none ${isScrolled ? 'text-on-surface hover:text-primary' : 'text-white hover:text-primary-container'}`}
            >
              <Menu size={24} />
            </button>
            <nav className="hidden md:flex gap-8 items-center">
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => onPageChange(item.id)}
                  className={`text-xs font-semibold tracking-widest uppercase py-1 relative group cursor-pointer transition-colors ${
                    currentPage === item.id 
                      ? (isScrolled ? 'text-primary' : 'text-primary-container brightness-125') 
                      : (isScrolled ? 'text-on-surface/70' : 'text-white/80 hover:text-white')
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-0 h-[1px] transition-all ${
                    isScrolled ? 'bg-primary' : 'bg-primary-container'
                  } ${
                    currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
            </nav>
          </div>

          <h1 
            className={`text-xl md:text-2xl font-serif tracking-tight font-medium italic cursor-pointer transition-colors ${
              isScrolled ? 'text-primary' : 'text-white drop-shadow-sm'
            }`}
            onClick={() => onPageChange('home')}
          >
            Kulsum Fabrica
          </h1>

          <div className="flex items-center gap-5">
            <button className={`transition-colors ${isScrolled ? 'text-on-surface/70 hover:text-primary' : 'text-white/80 hover:text-white'}`}>
              <Search size={20} />
            </button>
            <button 
              onClick={() => onPageChange('cart')}
              className={`transition-colors relative ${isScrolled ? 'text-on-surface/70 hover:text-primary' : 'text-white/80 hover:text-white'}`}
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-sm md:hidden"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-0 left-0 h-full w-[80%] max-w-sm bg-[#FDFBF7] shadow-2xl p-8 flex flex-col pt-24"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-8 right-8 text-on-surface/40 hover:text-primary transition-colors"
                id="close-mobile-menu"
              >
                <X size={24} />
              </button>
              
              <div className="flex-grow space-y-12 mt-4">
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left text-3xl font-serif tracking-tight transition-all ${
                      currentPage === item.id 
                        ? 'text-primary italic translate-x-2' 
                        : 'text-on-surface/80 hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-auto pb-8 border-t border-outline-variant pt-8">
                <div className="flex flex-col gap-6">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-tertiary uppercase mb-4 opacity-50">Connect With Us</p>
                    <div className="flex gap-6">
                      <a href="#" className="text-on-surface/60 hover:text-primary transition-colors">
                        <Instagram size={24} />
                      </a>
                      <a href="#" className="text-on-surface/60 hover:text-primary transition-colors">
                        <Facebook size={24} />
                      </a>
                      <a href="#" className="text-on-surface/60 hover:text-primary transition-colors">
                        <MessageCircle size={24} />
                      </a>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <p className="text-[10px] font-light text-tertiary/60 tracking-wider">
                      © 2026 Kulsum Fabrica. 
                      <br />Crafted in Softness.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const HERO_SLIDES = [
  {
    id: 'image-slide-1',
    type: 'image',
    url: 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777630227/ChatGPT_Image_May_1_2026_03_39_14_PM_lktrkn.png',
    title: 'Mira Malmal',
    subtitle: '100 Colours of Elegance',
    description: 'Premium quality malmal fabric in 100 stunning shades, crafted for comfort, style and timeless elegance.'
  },
  {
    id: 'image-slide-2',
    type: 'image',
    url: 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777649458/ChatGPT_Image_May_1_2026_08_56_57_PM_tjuptc.png',
    title: 'Everyday Luxury',
    subtitle: 'FEEL THE DIFFERENCE',
    description: 'Premium malmal in rich tones and soft textures, crafted to bring elegance into your daily wear.'
  },
  {
    id: 'video-slide',
    type: 'video',
    url: 'https://res.cloudinary.com/dfcuhk4mn/video/upload/v1777644726/WhatsApp_Video_2026-04-30_at_3.25.56_PM_bopjwx.mp4',
    title: 'Gentle Drapes',
    subtitle: 'LIGHT AS AIR',
    description: 'Delicately woven malmal designed for effortless movement, offering unmatched comfort and graceful styling.'
  },
  {
    id: 'embroidery-slide',
    type: 'image',
    url: 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778478715/ChatGPT_Image_May_11_2026_11_21_17_AM_wirkp8.png',
    title: 'Mira Malmal Embroidery',
    subtitle: 'DELICATE EMBROIDERY WOVEN INTO TIMELESS ELEGANCE',
    description: 'Breathable, graceful, and handcrafted. Experience the lightweight luxury of our premium white embroidered malmal collection.'
  }
];

const Hero = ({ onExplore, onFindShade }: { onExplore: () => void, onFindShade: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const slideDuration = 8000;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      setVideoReady(false);
    }, slideDuration);
    return () => clearInterval(timer);
  }, [currentSlide]);

  useEffect(() => {
    if (HERO_SLIDES[currentSlide].type === 'video') {
      const delay = setTimeout(() => setVideoReady(true), 1200);
      return () => clearTimeout(delay);
    }
  }, [currentSlide]);

  return (
    <section className="relative h-screen flex items-center overflow-hidden bg-surface-container">
      <AnimatePresence mode="wait">
        <motion.div 
          key={HERO_SLIDES[currentSlide].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 z-0"
        >
          {HERO_SLIDES[currentSlide].type === 'image' ? (
            <motion.img 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, ease: "linear" }}
              className="w-full h-full object-cover" 
              src={HERO_SLIDES[currentSlide].url} 
              alt={HERO_SLIDES[currentSlide].title} 
            />
          ) : (
            <div className={`w-full h-full transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}>
              <video 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover opacity-90"
              >
                <source src={HERO_SLIDES[currentSlide].url} type="video/mp4" />
              </video>
            </div>
          )}
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>
      
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 mt-16">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 30, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-left"
          >
            <h2 className={`font-cursive text-on-surface mb-2 leading-none tracking-normal ${
              HERO_SLIDES[currentSlide].title.length > 15 
                ? 'text-5xl md:text-7xl lg:text-8xl' 
                : 'text-7xl md:text-9xl'
            }`}>
              {HERO_SLIDES[currentSlide].title}
            </h2>
            <span className="inline-block text-[10px] md:text-sm font-bold tracking-[0.3em] text-primary uppercase mb-6 drop-shadow-sm">
              {HERO_SLIDES[currentSlide].subtitle}
            </span>
            <p className="text-lg md:text-xl text-tertiary mb-10 max-w-lg font-light leading-relaxed">
              {HERO_SLIDES[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={onExplore}
                className="px-8 py-4 bg-primary text-on-primary font-bold text-xs tracking-widest uppercase hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg hover:shadow-xl active:scale-95 w-full sm:w-auto"
              >
                Explore Collection
              </button>
              {HERO_SLIDES[currentSlide].id !== 'embroidery-slide' && (
                <button 
                  onClick={onFindShade}
                  className="px-8 py-4 bg-white/10 backdrop-blur-md text-on-surface border border-on-surface/10 font-bold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-lg hover:shadow-xl active:scale-95 w-full sm:w-auto"
                >
                  Find Your Perfect Shade
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-12 left-6 md:left-12 z-20 flex gap-4">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className="group py-4 focus:outline-none"
          >
            <div className={`h-0.5 transition-all duration-500 ${
              currentSlide === idx ? 'w-12 bg-primary' : 'w-6 bg-primary/30 group-hover:bg-primary/50'
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
};

const Spotlight = () => (
  <section className="py-24 md:py-32 bg-surface-container-low overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="order-2 md:order-1"
      >
        <h3 className="text-3xl md:text-4xl font-serif text-on-surface mb-8 leading-snug">
          Mira Malmal: A Breath of Heritage
        </h3>
        <p className="text-lg text-tertiary mb-10 leading-relaxed font-light">
          Soft breathable premium malmal fabric crafted for elegance and comfort. Each piece in the Mira series is an ode to artisanal craftsmanship, utilizing centuries-old weaving techniques to achieve a weightless feel that drapes like a second skin.
        </p>
        
        <ul className="space-y-5 mb-12">
          {[
            'Hand-spun organic cotton fibers',
            'Eco-friendly botanical dyes',
            'Artisan-stamped metallic accents'
          ].map((feature, idx) => (
            <motion.li 
              key={feature} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="flex items-center gap-4 text-on-surface group"
            >
              <div className="bg-primary/10 p-1 rounded-full group-hover:bg-primary/20 transition-colors">
                <CheckCircle size={18} className="text-primary" />
              </div>
              <span className="text-sm font-medium tracking-wide">{feature}</span>
            </motion.li>
          ))}
        </ul>
        
        <a 
          href="#" 
          className="inline-flex items-center gap-2 border-b border-primary text-primary font-bold text-xs tracking-[0.1em] uppercase pb-2 hover:border-b-2 hover:gap-3 transition-all"
        >
          Discover The Weave <ChevronRight size={14} />
        </a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="order-1 md:order-2 relative"
      >
        <div className="aspect-[4/5] relative z-10">
          <img 
            className="w-full h-full object-cover rounded-sm shadow-2xl" 
            src={IMAGES.spotlight} 
            alt="Artisanal Mira Malmal weaving" 
          />
        </div>
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute -bottom-8 -left-8 bg-surface p-8 shadow-2xl max-w-[220px] border border-outline-variant z-20"
        >
          <span className="text-6xl font-serif text-primary leading-none font-light">100%</span>
          <p className="text-[10px] font-bold tracking-widest text-tertiary mt-3 uppercase">Pure Artisanal Cotton</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const ProductCard = ({ product, index }: { product: Product; index: number; key?: number | string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="group"
  >
    <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-surface-container-high cursor-pointer">
      <img 
        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        src={product.image} 
        alt={product.name} 
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      
      {/* Tonal separation layered depth */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
        <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <button className="flex-1 bg-surface py-3.5 text-primary text-[10px] font-bold tracking-widest border border-primary/20 hover:bg-primary hover:text-on-primary transition-all uppercase">
            Quick View
          </button>
          <button className="flex-1 bg-primary py-3.5 text-on-primary text-[10px] font-bold tracking-widest hover:bg-primary-container hover:text-on-primary-container transition-all uppercase">
            Add to Bag
          </button>
        </div>
      </div>
    </div>
    
    <div className="text-center px-4">
      <h4 className="text-lg font-serif text-on-surface mb-1 group-hover:text-primary transition-colors">
        {product.name}
      </h4>
      <p className="text-sm font-semibold text-primary tracking-tight">
        {product.price}
      </p>
    </div>
  </motion.div>
);

const ProductGrid = () => (
  <section className="py-24 md:py-32 max-w-7xl mx-auto px-6 md:px-12">
    <div className="text-center mb-16 md:mb-20">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-serif text-on-surface mb-6 font-light"
      >
        Our Dupatta Collections
      </motion.h2>
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: 80 }}
        viewport={{ once: true }}
        className="h-[1px] bg-primary mx-auto" 
      />
    </div>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
      {IMAGES.products.map((product, idx) => (
        <ProductCard key={product.id} product={product} index={idx} />
      ))}
    </div>
  </section>
);

const Features = () => (
  <section className="py-24 border-t border-outline-variant bg-surface">
    <div className="max-w-7xl mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
        {[
          { icon: <Verified size={32} />, title: 'Premium Quality', desc: 'Every thread is hand-selected and inspected for the ultimate luxury feel.' },
          { icon: <ShoppingCart size={32} />, title: 'Easy Order', desc: 'Seamless shopping experience with secure checkout and multiple payment options.' },
          { icon: <Truck size={32} />, title: 'Fast Delivery', desc: 'Expedited worldwide shipping ensuring your pieces arrive in pristine condition.' }
        ].map((item, idx) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="flex flex-col items-center group"
          >
            <div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center mb-8 group-hover:bg-primary-container/20 group-hover:scale-110 transition-all duration-500">
              <div className="text-primary">{item.icon}</div>
            </div>
            <h5 className="text-xl font-serif text-on-surface mb-4 font-medium italic">{item.title}</h5>
            <p className="text-sm text-tertiary max-w-xs leading-relaxed font-light">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-surface">
      {/* Section 1 – Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777655753/ChatGPT_Image_May_1_2026_10_43_14_PM_rrosae.png" 
            alt="Kulsum Fabrica textile heritage" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display text-white mb-8 leading-tight drop-shadow-lg">
            Crafted in Softness.<br />
            <span className="italic text-primary-container brightness-125">Rooted in Elegance.</span>
          </h2>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            From Bhiwandi, we bring premium malmal fabrics designed for comfort, grace, and everyday luxury.
          </p>
        </motion.div>
      </section>

      {/* Section 2 – Our Story */}
      <section className="py-24 md:py-32 bg-surface-container-low px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-6">Our Story</h3>
            <h4 className="text-3xl md:text-5xl font-display text-on-surface mb-10 leading-snug">
              Heritage of Weaves
            </h4>
            <div className="h-[1px] w-20 bg-primary/30 mx-auto mb-10" />
            <p className="text-lg md:text-xl text-tertiary font-light leading-relaxed mb-8 italic">
              "Kulsum Fabrica is proudly based in Bhiwandi, a city known for its textile heritage."
            </p>
            <p className="text-base md:text-lg text-on-surface/80 font-light leading-relaxed max-w-3xl mx-auto">
              Our journey began with a simple idea — to create high-quality malmal fabric that feels as good as it looks. We focus on softness, breathability, and timeless design for everyday wear.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 2.5 – Our History */}
      <section className="py-24 md:py-32 bg-surface-container-high px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="border-l border-primary/20 pl-8 md:pl-12">
              <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-8">Our History</h3>
              <div className="space-y-8 text-lg md:text-xl text-tertiary font-light leading-relaxed">
                <p>
                  Kulsum Fabrica traces its roots back to 1998, when our grandfather began working with fabrics in Bhiwandi, a city known for its rich textile heritage. With years of hands-on experience, he built a foundation based on quality, trust, and deep understanding of fabric.
                </p>
                <p>
                  Over time, this legacy has been carried forward, blending traditional knowledge with a modern approach. Today, Kulsum Fabrica continues that journey — creating malmal fabrics that reflect both heritage and contemporary elegance.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-1 lg:order-2 relative flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-sm aspect-[4/5] overflow-hidden rounded-sm shadow-2xl relative z-10 bg-surface-container">
              <img 
                src="https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777655181/WhatsApp_Image_2026-05-01_at_10.34.07_PM_z9yccr.jpg" 
                alt="Founder of Kulsum Fabrica" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 lg:left-auto lg:right-0 -translate-x-1/2 translate-y-1/2 lg:translate-x-4 lg:translate-y-4 w-48 h-48 border-r border-b border-primary/20 -z-0 opacity-50 lg:opacity-100" />
            <div className="absolute top-1/2 left-1/2 lg:left-auto lg:right-0 -translate-x-1/2 -translate-y-1/2 lg:-translate-x-4 lg:-translate-y-4 w-48 h-48 border-l border-t border-primary/20 -z-0 opacity-50 lg:opacity-100" />
            <div className="absolute top-1/2 -right-12 w-24 h-[1px] bg-primary/20 hidden lg:block" />
          </motion.div>
        </div>
      </section>

      {/* Section 3 – Our Philosophy */}
      <section className="py-24 md:py-32 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-6">Our Philosophy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: 'Softness First', desc: 'Designed for comfort and lightness', accent: '01' },
              { title: 'Timeless Design', desc: 'Elegant and versatile for daily use', accent: '02' },
              { title: 'Honest Craft', desc: 'Simple, refined, and thoughtfully made', accent: '03' }
            ].map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="group p-10 border border-outline-variant/30 hover:border-primary/20 transition-all duration-500 relative bg-surface-container/20"
              >
                <div className="absolute top-4 right-6 text-6xl font-display text-primary/5 group-hover:text-primary/10 transition-colors uppercase italic font-bold">
                  {item.accent}
                </div>
                <h5 className="text-2xl font-serif text-on-surface mb-4 font-medium italic">{item.title}</h5>
                <p className="text-sm text-tertiary leading-relaxed font-light">{item.desc}</p>
                <div className="mt-8 w-8 h-[1px] bg-primary/20 group-hover:w-16 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 – Why Malmal */}
      <section className="py-24 md:py-32 bg-surface-container-high px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-8">Why Malmal?</h3>
            <h4 className="text-3xl md:text-5xl font-display text-on-surface mb-10 leading-tight">
              A Fabric that <span className="italic text-primary">Breathes With You</span>
            </h4>
            <div className="space-y-6 text-lg text-tertiary font-light leading-relaxed">
              <p>
                Malmal is valued for its airy texture and natural softness. It has been the preferred fabric for royalty and commoners alike in the Indian subcontinent for centuries.
              </p>
              <p>
                Perfect for Indian weather, it offers comfort, breathability, and ease of wear throughout the day. At Kulsum Fabrica, we preserve this essence while bringing modern quality standards.
              </p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-square relative"
          >
            <img 
              src="https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777800694/gp1_rgywee.png" 
              alt="Malmal texture detail" 
              className="w-full h-full object-cover rounded-sm shadow-xl"
            />
            <div className="absolute inset-0 border-[20px] border-surface translate-x-6 translate-y-6 -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Section 5 – Our Collection */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-6">Our Collection</h3>
            <h4 className="text-3xl md:text-5xl font-display text-on-surface mb-8">Mira Malmal Collection</h4>
            <div className="h-[1px] w-40 bg-primary/30 mx-auto mb-10" />
            <p className="text-lg md:text-xl text-tertiary font-light leading-relaxed max-w-2xl mx-auto">
              Our collection features a wide range of colours and soft textures, allowing you to express your style with comfort and elegance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 5.5 – Our Location */}
      <section className="py-24 md:py-32 bg-surface-container-low px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h3 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-8">Visit Our Studio</h3>
              <h4 className="text-3xl md:text-5xl font-display text-on-surface mb-10 leading-tight">
                Rooted in <span className="italic text-primary">Bhiwandi</span>
              </h4>
              <div className="space-y-10">
                <div className="flex gap-6 items-start">
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <ArrowRight size={18} className="text-primary" />
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold tracking-widest uppercase text-primary/60 mb-2">Our Address</h5>
                    <p className="text-xl md:text-2xl text-on-surface font-light leading-relaxed">
                      Kulsum Fabrica,<br />
                      Opp. Fire Brigade, Old Agra Road,<br />
                      Bhiwandi - 421302, Maharashtra,<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pl-16">
                  <div>
                    <h5 className="text-[10px] font-bold tracking-widest uppercase text-primary/60 mb-2">Email Address</h5>
                    <p className="text-base text-tertiary font-light">hello@kulsumfabrica.com</p>
                  </div>
                  <div>
                    <h5 className="text-[10px] font-bold tracking-widest uppercase text-primary/60 mb-2">WhatsApp Us</h5>
                    <p className="text-base text-tertiary font-light">+91-8698763538</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2 relative aspect-video md:aspect-[4/3] lg:aspect-square group overflow-hidden rounded-sm shadow-2xl"
            >
              <img 
                src="https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778484741/MAP_vy2gmc.png" 
                alt="Kulsum Fabrica Location Map" 
                className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/20 to-transparent">
                <span className="text-[9px] font-bold tracking-[0.4em] text-white uppercase">Our Headquarters</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 6 – Closing Line */}
      <section className="py-32 md:py-48 px-6 bg-surface-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-cursive text-primary mb-4 drop-shadow-sm">
            Soft as Nature.
          </h2>
          <h3 className="text-2xl md:text-4xl font-display text-on-surface/60 italic">
            Woven for You.
          </h3>
        </motion.div>
      </section>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-surface-container-high dark:bg-stone-950 pt-24 pb-12">
    <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 mb-20">
      <div className="lg:col-span-1">
        <h4 className="text-2xl font-serif italic text-primary mb-8 font-medium">Kulsum Fabrica</h4>
        <p className="text-sm tracking-wide text-tertiary leading-relaxed mb-10 max-w-xs font-light">
          Reviving the heritage of Indian textiles through ethically crafted luxury malmal. Each thread tells a story of tradition and timeless elegance.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-tertiary hover:text-primary transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-tertiary hover:text-primary transition-colors">
            <Instagram size={20} />
          </a>
        </div>
      </div>

      <div>
        <h5 className="text-xs font-bold tracking-[0.2em] text-on-surface uppercase mb-8">Quick Links</h5>
        <ul className="space-y-5">
          {['Home', 'Collection', 'About', 'Contact'].map((link) => (
            <li key={link}>
              <a href="#" className="text-sm text-tertiary hover:text-primary transition-colors font-light">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-2">
        <h5 className="text-xs font-bold tracking-[0.2em] text-on-surface uppercase mb-8">Contact Us</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-sm text-tertiary leading-relaxed font-light">
              Bhiwandi, Maharashtra,<br />
              India
            </p>
          </div>
          <div>
            <p className="text-sm text-tertiary mb-3 font-light">+91-8698763538</p>
            <p className="text-sm text-tertiary font-light">hello@kulsumfabrica.com</p>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-10 border-t border-outline-variant/30 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-[10px] tracking-[0.15em] text-tertiary uppercase font-medium">
        © {new Date().getFullYear()} Kulsum Fabrica. Based in Bhiwandi, India.
      </p>
      <div className="flex gap-8">
        <span className="text-[10px] text-tertiary/60 tracking-widest uppercase cursor-pointer hover:text-primary">Terms</span>
        <span className="text-[10px] text-tertiary/60 tracking-widest uppercase cursor-pointer hover:text-primary">Privacy</span>
      </div>
    </div>
  </footer>
);

const COLLECTION_PRODUCTS = [
  { id: 101, name: 'Mira Malmal Dupatta', price: '₹199', image: 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777800695/malmal_dg0qde.png', description: 'Soft, breathable premium malmal fabric crafted with 100% fine cotton for unmatched comfort.', tags: ['2.25 Meter', 'Soft', 'Pure Malmal'] },
  { id: 109, name: 'Mira Nazmeen Dupatta', price: '₹150', image: 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778482880/NAZ_b4jexd.png', description: 'Experience the sheer luxury of our Nazmeen collection, blending delicate textures with effortless grace.', tags: ['2.25 Meter', 'Sheer', 'Premium Nazmeen'] },
  { 
    id: 110, 
    name: 'Mira Malmal Embroidery', 
    price: '₹270', 
    image: 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778474227/WhatsApp_Image_2026-05-11_at_10.06.08_AM_qqj6lt.jpg', 
    designs: [
      {
        name: 'Design 1',
        images: [
          'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778474227/WhatsApp_Image_2026-05-11_at_10.06.08_AM_qqj6lt.jpg',
          'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778476953/WhatsApp_Image_2026-05-11_at_10.51.48_AM_qvsqax.jpg'
        ]
      },
      {
        name: 'Design 2',
        images: [
          'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778475963/WhatsApp_Image_2026-05-11_at_10.35.24_AM_fkn4ip.jpg',
          'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778476953/WhatsApp_Image_2026-05-11_at_10.50.51_AM_orb2cm.jpg'
        ]
      }
    ],
    description: 'Premium white embroidered malmal dupatta with elegant floral patterns, offering a sophisticated look with breathable comfort.', 
    tags: ['Dyeable Fabric', 'Embroidered', 'Premium'] 
  },
];

const Collection = ({ 
  scrollToProducts = false, 
  onAddToCart, 
  autoOpenProductId, 
  onModalClosed 
}: { 
  scrollToProducts?: boolean, 
  onAddToCart: (product: any, color: string, image: string) => void,
  autoOpenProductId?: number | null,
  onModalClosed?: () => void
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSort, setActiveSort] = useState('Newest');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollToProducts && gridRef.current) {
      setTimeout(() => {
        gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [scrollToProducts]);

  useEffect(() => {
    if (autoOpenProductId) {
      const product = COLLECTION_PRODUCTS.find(p => p.id === autoOpenProductId);
      if (product) {
        setSelectedProduct(product);
      }
    }
  }, [autoOpenProductId]);

  return (
    <div className="min-h-screen bg-[#F9F6F1] pb-24">
      {/* Top Banner Section */}
      <section className="relative w-full h-[300px] md:h-[350px] overflow-hidden mb-16 flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777802015/ChatGPT_Image_May_3_2026_03_22_42_PM_ypdo41.png" 
            alt="Collection background texture" 
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* Subtle gradient to ensure header visibility and text contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent opacity-40" />
          <div className="absolute inset-0 bg-stone-900/5 mix-blend-multiply" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-5 inline-block opacity-80">Exclusive Collection</span>
            <h2 className="text-4xl md:text-6xl font-display text-on-surface mb-5 leading-tight tracking-tight">
              Our Premium Collections
            </h2>
            <div className="w-12 h-[1px] bg-primary/30 mb-6" />
            <p className="text-base md:text-xl text-tertiary font-light max-w-xl leading-relaxed opacity-90">
              100 shades of softness, crafted for everyday elegance and luxury.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-primary/5" />
      </section>

      {/* Filter & Sort Bar */}
      <div ref={gridRef} className="max-w-7xl mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-primary/10 pb-8">
        <div className="flex flex-wrap gap-8">
          {['All', 'Ivory', 'Neutral', 'Vibrant', 'Dark'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-[11px] font-bold tracking-widest uppercase relative py-1 transition-colors ${
                activeFilter === filter ? 'text-primary' : 'text-on-surface/50 hover:text-on-surface'
              }`}
            >
              {filter}
              {activeFilter === filter && (
                <motion.span layoutId="filterUnderline" className="absolute bottom-0 left-0 w-full h-[1px] bg-primary" />
              )}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold tracking-widest text-on-surface/40 uppercase">Sort By:</span>
          <select 
            value={activeSort}
            onChange={(e) => setActiveSort(e.target.value)}
            className="bg-transparent text-[11px] font-bold tracking-widest uppercase focus:outline-none cursor-pointer text-on-surface"
          >
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Popularity</option>
          </select>
        </div>
      </div>

      <div 
        className="max-w-7xl mx-auto px-6 md:px-12"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {COLLECTION_PRODUCTS.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden mb-5 bg-stone-200 rounded-sm">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                
                {/* Hover Quick View */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center translate-y-4 group-hover:translate-y-0">
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white/90 backdrop-blur-sm text-primary py-3 px-8 text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all shadow-xl rounded-sm"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex gap-2 mb-3">
                  {product.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold tracking-widest uppercase text-primary/60 border border-primary/10 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-serif text-on-surface group-hover:text-primary transition-colors leading-tight">
                  {product.name}
                </h3>
                <p className="text-sm font-semibold text-primary/80">
                  {product.price}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <QuickView 
            product={selectedProduct} 
            onClose={() => {
              setSelectedProduct(null);
              if (onModalClosed) onModalClosed();
            }} 
            onAddToCart={onAddToCart}
            autoFocusColorMatch={autoOpenProductId === selectedProduct.id}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const ColorMatchTool = ({ onSelect, currentImages }: { onSelect: (color: string) => void, currentImages: Record<string, string> }) => {
  const [matching, setMatching] = useState(false);
  const [matchResult, setMatchResult] = useState<{ color: string, alternatives: any[] } | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [detectedColor, setDetectedColor] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const resetMatch = () => {
    setMatchResult(null);
    setUploadedImage(null);
    setDetectedColor(null);
  };

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgUrl = event.target?.result as string;
        setUploadedImage(imgUrl);
        detectColor(imgUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectColor = (imgUrl: string) => {
    setMatching(true);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Higher resolution for better detail analysis
      const size = 100;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);

      const imageData = ctx.getImageData(0, 0, size, size).data;
      let totalR = 0, totalG = 0, totalB = 0, totalWeight = 0;
      
      const centerX = size / 2;
      const centerY = size / 2;
      const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const i = (y * size + x) * 4;
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          
          // 1. Fabric-Focused Detection: Ignore shadows (very dark) and blowouts (very bright)
          const brightness = (r + g + b) / 3;
          if (brightness < 20 || brightness > 245) continue;

          // 2. Ignore Neutral Backgrounds: Prevent beige, white, grey backgrounds from dominating
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const saturation = max === 0 ? 0 : (max - min) / max;
          
          // Most fabric colours have at least some saturation
          // Backgrounds/walls are usually low saturation and high brightness
          const isNeutral = saturation < 0.15 && brightness > 120;
          const isBeigeBackground = r > 200 && g > 180 && b > 140 && saturation < 0.25;
          
          if (isNeutral || isBeigeBackground) continue;

          // 3. Center Weighting: pixels closer to center have much more weight (Gauss-like)
          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          // Quadratic dropoff makes the center extremely dominant
          const weight = Math.pow(Math.max(0, 1 - (dist / maxDist)), 3);

          totalR += r * weight;
          totalG += g * weight;
          totalB += b * weight;
          totalWeight += weight;
        }
      }

      let finalR, finalG, finalB;
      
      // 4. Result Extraction: If valid fabric pixels found, use weighted average
      if (totalWeight > 0) {
        finalR = Math.round(totalR / totalWeight);
        finalG = Math.round(totalG / totalWeight);
        finalB = Math.round(totalB / totalWeight);
      } else {
        // Fallback: use a small center grid if everything was filtered
        let fallR = 0, fallG = 0, fallB = 0, fallC = 0;
        for (let y = 45; y < 55; y++) {
          for (let x = 45; x < 55; x++) {
            const i = (y * size + x) * 4;
            fallR += imageData[i];
            fallG += imageData[i+1];
            fallB += imageData[i+2];
            fallC++;
          }
        }
        finalR = Math.round(fallR / fallC);
        finalG = Math.round(fallG / fallC);
        finalB = Math.round(fallB / fallC);
      }

      const colorHex = `#${((1 << 24) + (finalR << 16) + (finalG << 8) + finalB).toString(16).slice(1)}`;
      setDetectedColor(colorHex);

      const matches = getClosestColors([finalR, finalG, finalB]);
      
      setTimeout(() => {
        setMatchResult({
          color: matches[0].name,
          alternatives: matches.slice(1)
        });
        onSelect(matches[0].name);
        setMatching(false);
      }, 1500);
    };
  };

  return (
    <div className="pt-2 border-t border-on-surface/5">
      <canvas ref={canvasRef} className="hidden" />

      {/* Entry Section */}
      {!uploadedImage && !matching && (
        <div className="flex items-center justify-between gap-4">
          <h4 className="text-[9px] font-bold tracking-[0.2em] text-on-surface/30 uppercase">Find Match</h4>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-all px-4 py-2 cursor-pointer rounded-sm shadow-sm active:scale-[0.98]">
              <Upload size={12} />
              <span className="text-[8px] font-bold tracking-[0.2em] uppercase whitespace-nowrap">Upload Colour</span>
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
            </label>
            <label 
              title="Use Camera"
              className="flex items-center justify-center bg-white text-primary border border-on-surface/10 hover:border-primary/20 transition-all w-[34px] h-[34px] cursor-pointer rounded-sm shadow-sm active:scale-[0.98]"
            >
              <Camera size={16} />
              <input type="file" className="hidden" accept="image/*" capture="environment" onChange={handleUpload} />
            </label>
          </div>
        </div>
      )}

      {/* Matching Loader */}
      {matching && (
        <div className="flex items-center justify-center py-4 gap-3">
          <div className="w-5 h-5 border-2 border-primary/10 border-t-primary rounded-full animate-spin" />
          <p className="text-[8px] font-bold tracking-[0.2em] text-on-surface/40 uppercase animate-pulse">Analysing tones...</p>
        </div>
      )}

      {/* Match Result Display */}
      {matchResult && !matching && (
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Analysis Header */}
          <div className="flex items-center justify-between pb-2 border-b border-black/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-black/5 ring-2 ring-white shadow-sm flex-shrink-0">
                <img src={uploadedImage!} alt="Original" className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full shadow-inner" style={{ backgroundColor: detectedColor! }} />
                <span className="text-[8px] font-bold tracking-widest uppercase text-on-surface/40">Matches found</span>
              </div>
            </div>
            <button 
              onClick={resetMatch}
              className="text-[8px] font-bold tracking-widest uppercase text-on-surface/30 hover:text-primary transition-colors flex items-center gap-1"
            >
              Reset <Upload size={8} />
            </button>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {/* Best Match Card */}
            <div className="sm:col-span-3">
              <span className="text-[7px] font-bold tracking-widest uppercase text-primary mb-1.5 block">Recommended pairing</span>
              <motion.div 
                whileHover={{ y: -2 }}
                onClick={() => onSelect(matchResult.color)}
                className="group cursor-pointer bg-white p-2 border border-primary/10 shadow-sm relative flex items-center gap-3"
              >
                <div className="w-12 h-16 bg-stone-50 overflow-hidden rounded-sm flex-shrink-0">
                  <img src={currentImages[matchResult.color]} alt={matchResult.color} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h5 className="text-[9px] font-bold tracking-[0.1em] text-on-surface uppercase mb-0.5">{matchResult.color}</h5>
                  <div className="flex items-center gap-1">
                    <span className="text-[7px] text-tertiary italic">Best match for you</span>
                  </div>
                </div>
                <Check size={10} className="text-primary" />
              </motion.div>
            </div>

            {/* Similar Shades */}
            {matchResult.alternatives.length > 0 && (
              <div className="sm:col-span-2">
                <span className="text-[7px] font-bold tracking-widest uppercase text-on-surface/30 mb-1.5 block">Alternatives</span>
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                  {matchResult.alternatives.map((alt) => (
                    <motion.div 
                      key={alt.name}
                      onClick={() => onSelect(alt.name)}
                      className="cursor-pointer bg-white/40 p-1.5 border border-black/[0.02] hover:border-primary/10 transition-all flex items-center gap-2 group"
                    >
                      <div className="w-6 h-8 bg-stone-50 overflow-hidden flex-shrink-0 rounded-sm">
                        <img src={currentImages[alt.name]} alt={alt.name} className="w-full h-full object-cover" />
                      </div>
                      <h6 className="text-[8px] font-bold tracking-widest text-on-surface uppercase flex-grow truncate">{alt.name}</h6>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>

  );
};

const ColorSwatches = ({ selected, onSelect, isMalmal }: { selected: string, onSelect: (color: string) => void, isMalmal: boolean }) => {
  const baseColors = [
    "PEACH", "BLACK", "NAVY BLUE", "RED", "CHERRY RANI", "BEIGE", "WHITE", "ONION", "MAROON"
  ];
  
  const malmalExclusive = [
    "BOTTLE GREEN", "COFFEE", "CHIKOO",
    "SAND BEIGE", "CAMEL TAN", "ALMOND CREAM", "MOCHA MIST", "WALNUT BROWN", 
    "TAUPE GREY", "ASH BROWN", "IVORY SAND", "COCOA DUST", "STONE BEIGE",
    "ROSE PINK", "DUSTY MAUVE", "BLUSH NUDE", "SOFT LAVENDER", "VINTAGE ROSE", 
    "POWDER PINK", "CORAL PEACH", "PLUM WINE", "BERRY ROSE", "MAUVE ORCHID"
  ];

  const allColors = isMalmal ? [...baseColors, ...malmalExclusive] : baseColors;

  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 pt-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
      {allColors.map((colorName) => {
        const colorInfo = DUPATTA_COLORS.find(c => c.name === colorName);
        const isSelected = selected === colorName;
        
        return (
          <button
            key={colorName}
            onClick={() => onSelect(colorName)}
            className="group flex flex-col items-center gap-1.5 focus:outline-none"
          >
            <div 
              className={`relative w-10 h-10 rounded-full border transition-all duration-300 flex items-center justify-center linen-texture
                ${isSelected 
                  ? 'border-[#C5A059] ring-2 ring-[#C5A059]/20 shadow-[0_0_15px_rgba(197,160,89,0.3)]' 
                  : 'border-on-surface/10 hover:border-on-surface/30'
                }`}
              style={{ backgroundColor: colorInfo?.hex }}
            >
              {isSelected && (
                <motion.div 
                  layoutId="selectedIndicator"
                  className="absolute inset-0 rounded-full border-2 border-white/40"
                />
              )}
              {colorName === "WHITE" && !isSelected && <div className="absolute inset-0 rounded-full border border-black/5" />}
            </div>
            <span className={`text-[7px] font-bold tracking-widest uppercase transition-colors text-center leading-tight h-4 flex items-center
              ${isSelected ? 'text-primary' : 'text-on-surface/40 group-hover:text-on-surface/60'}`}
            >
              {colorName}
            </span>
          </button>
        );
      })}
    </div>
  );
};

const QuickView = ({ 
  product, 
  onClose, 
  onAddToCart,
  autoFocusColorMatch = false
}: { 
  product: any, 
  onClose: () => void, 
  onAddToCart: (product: any, color: string, image: string) => void,
  autoFocusColorMatch?: boolean
}) => {
  const isEmbroidery = product.name.toLowerCase().includes('embroidery');
  const [selectedColor, setSelectedColor] = useState(isEmbroidery ? 'WHITE' : 'PEACH');
  const [selectedDesignIndex, setSelectedDesignIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const colorMatchRef = useRef<HTMLDivElement>(null);
  
  const currentDesign = product.designs ? product.designs[selectedDesignIndex] : null;
  const productImages = currentDesign ? currentDesign.images : (product.images || [product.image]);
  const hasMultipleImages = productImages.length > 1;

  useEffect(() => {
    if (isEmbroidery) {
      setSelectedColor('WHITE');
    }
  }, [product, isEmbroidery]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedDesignIndex]);

  useEffect(() => {
    if (autoFocusColorMatch && colorMatchRef.current && !isEmbroidery) {
      const scrollTimeout = setTimeout(() => {
        colorMatchRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 600);
      return () => clearTimeout(scrollTimeout);
    }
  }, [autoFocusColorMatch, isEmbroidery]);
  
  const isMalmalOrNazmeen = (product.name.toLowerCase().includes('malmal') || product.name.toLowerCase().includes('nazmeen')) && !isEmbroidery;
  
  const colorImages: Record<string, string> = {
    ...(isEmbroidery ? { 'WHITE': currentDesign ? currentDesign.images[0] : product.image } : {
      'PEACH': product.image,
      'MAROON': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777806141/MAR0ON_ktr95c.png',
      'WHITE': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777808157/WHITE_jgyvgw.png',
      'BLACK': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777808477/BLACK_mdxrwp.png',
      'NAVY BLUE': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777809123/NAVY_BLUE_connmk.png',
      'BEIGE': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777809280/BEIGE_te1t7e.png',
      'ONION': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777809592/ONION_ojdhkp.png',
      'RED': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777809880/RED_zpmdwe.png',
      'CHERRY RANI': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1777810103/RANI_dt3lxm.png',
      ...(isMalmalOrNazmeen ? { 
        'BOTTLE GREEN': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778395654/bottlee_green_vjhs1d.png',
        'COFFEE': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778396840/coffee_muix4w.png',
        'CHIKOO': 'https://res.cloudinary.com/dfcuhk4mn/image/upload/v1778397429/chicckoo_pu41uk.png'
      } : {})
    })
  };

  const currentImage = isEmbroidery 
    ? productImages[activeImageIndex] 
    : (colorImages[selectedColor] || product.image);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" 
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative bg-[#F9F6F1] w-full max-w-4xl max-h-[92vh] overflow-y-auto md:overflow-hidden rounded-sm shadow-2xl flex flex-col md:flex-row isolate"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-on-surface/40 hover:text-primary transition-colors bg-white/20 backdrop-blur-md rounded-full shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Left: Image Section */}
        <div className="w-full md:w-1/2 flex-shrink-0 bg-stone-100 group relative flex flex-col items-center justify-center sticky top-0 z-30 md:static md:shadow-none bg-stone-100">
          <div className="w-full h-[280px] md:h-full relative overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={currentImage} 
                alt={`${product.name}`} 
                className="w-full h-full object-cover transition-transform duration-1000 md:group-hover:scale-105"
              />
            </AnimatePresence>
            
            {/* Gallery Navigation for Multiple Images */}
            {hasMultipleImages && (
              <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
                <button 
                  onClick={() => setActiveImageIndex(prev => (prev === 0 ? productImages.length - 1 : prev - 1))}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-on-surface hover:bg-white transition-all pointer-events-auto"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setActiveImageIndex(prev => (prev === productImages.length - 1 ? 0 : prev + 1))}
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm text-on-surface hover:bg-white transition-all pointer-events-auto"
                >
                  <ChevronDown className="-rotate-90" size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Thumbnail Gallery (Compact for mobile) */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-1.5 bg-white/40 backdrop-blur-md rounded-full border border-white/40 shadow-sm z-20">
              {productImages.map((img: string, idx: number) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-8 h-10 md:w-12 md:h-16 rounded-sm overflow-hidden border transition-all duration-300 ${
                    activeImageIndex === idx ? 'border-primary ring-1 ring-primary/20 scale-110' : 'border-white/60'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Only shown on mobile: Sticky Name & Price */}
          <div className="md:hidden w-full px-6 py-4 bg-[#F9F6F1] border-b border-outline-variant/30 shadow-sm">
            <h2 className="text-xl font-display text-on-surface mb-0.5 leading-tight">
              {product.name}
            </h2>
            <div className="flex justify-between items-center">
              <p className="text-lg font-semibold text-primary/80 font-sans">
                {product.price}
              </p>
              <span className="text-[8px] font-bold tracking-[0.2em] text-primary/60 uppercase">Premium Collection</span>
            </div>
            <p className="text-[11px] text-tertiary font-light leading-snug mt-1 opacity-70 line-clamp-1">
              {product.description || "Soft, breathable premium malmal fabric designed for supreme comfort."}
            </p>
          </div>
        </div>

        {/* Right: Details Section */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col bg-[#F9F6F1]">
          {/* Desktop Basic Info */}
          <div className="hidden md:block mb-6">
            <span className="text-[10px] font-bold tracking-[0.3em] text-primary/60 uppercase mb-2 block">Premium Collection</span>
            <h2 className="text-2xl md:text-3xl font-display text-on-surface mb-2 leading-tight">
              {product.name}
            </h2>
            <p className="text-xl font-semibold text-primary/80 mb-4 font-sans">
              {product.price}
            </p>
            <p className="text-sm text-tertiary font-light leading-relaxed mb-4 opacity-80">
              {product.description || "Soft, breathable premium malmal fabric designed for supreme comfort and effortless style."}
            </p>
          </div>

          <div className="space-y-4 md:space-y-6 flex-grow">
            {/* Dyeable Specification for Embroidery */}
            {isEmbroidery && (
              <div className="flex items-center gap-2 py-2 px-3 bg-primary/5 border border-primary/10 rounded-sm w-fit">
                <CheckCircle size={14} className="text-primary" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-primary">Dyeable Fabric</span>
              </div>
            )}

            {/* Design Selection for Embroidery */}
            {isEmbroidery && product.designs && (
              <div className="space-y-2">
                <label className="block text-[8px] font-bold tracking-[0.2em] text-on-surface/40 uppercase">
                  Select Design
                </label>
                <div className="flex gap-3">
                  {product.designs.map((design: any, idx: number) => (
                    <button 
                      key={design.name}
                      onClick={() => setSelectedDesignIndex(idx)}
                      className={`flex-1 py-3 px-4 border text-[9px] font-bold tracking-widest uppercase transition-all rounded-sm ${
                        selectedDesignIndex === idx 
                          ? 'border-primary bg-primary text-on-primary shadow-md' 
                          : 'border-on-surface/10 text-on-surface/60 hover:border-primary/30'
                      }`}
                    >
                      {design.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Match Tool Integration */}
            {!isEmbroidery && (
              <div ref={colorMatchRef} className={`space-y-2 ${autoFocusColorMatch ? "ring-1 ring-primary/20 rounded-sm p-3 -m-3 bg-primary/[0.02]" : ""}`}>
                <ColorMatchTool onSelect={(color) => setSelectedColor(color)} currentImages={colorImages} />
              </div>
            )}

            {/* Color Selection */}
            {!isEmbroidery && (
              <div className="space-y-2">
                <label className="block text-[8px] font-bold tracking-[0.2em] text-on-surface/40 uppercase">
                  Select Colour
                </label>
                <ColorSwatches 
                  selected={selectedColor} 
                  onSelect={setSelectedColor} 
                  isMalmal={isMalmalOrNazmeen} 
                />
              </div>
            )}

            {/* Static Color display for Embroidery */}
            {isEmbroidery && (
              <div className="flex flex-col gap-2">
                <label className="block text-[8px] font-bold tracking-[0.2em] text-on-surface/40 uppercase">
                  Colour
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-primary/20 bg-white shadow-sm flex items-center justify-center">
                    <Check size={14} className="text-primary" />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-on-surface">White</span>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Bottom Add to Cart (More compact on mobile) */}
          <div className="sticky bottom-0 bg-[#F9F6F1] z-30 -ms-6 -me-6 px-6 pt-4 pb-6 mt-8 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] md:static md:m-0 md:p-0 md:shadow-none md:mt-10">
            <button 
              onClick={() => {
                const finalProduct = isEmbroidery ? { ...product, name: `${product.name} - ${currentDesign.name}` } : product;
                onAddToCart(finalProduct, selectedColor, currentImage);
                onClose();
              }}
              className="w-full bg-primary text-on-primary py-3 md:py-4 px-6 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase hover:bg-primary-container hover:text-on-primary-container transition-all shadow-lg active:scale-[0.98]"
            >
              Add to Cart
            </button>
            
            <button className="w-full text-center mt-4 group">
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] text-on-surface/40 uppercase group-hover:text-primary transition-colors flex items-center justify-center gap-2">
                View Full Details <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CartPage = ({ 
  items, 
  onUpdateQuantity, 
  onRemove, 
  onContinue 
}: { 
  items: any[], 
  onUpdateQuantity: (id: number, color: string, delta: number) => void, 
  onRemove: (id: number, color: string) => void,
  onContinue: () => void
}) => {
  const subtotal = items.reduce((acc, item) => {
    const priceStr = item.product.price.replace(/[^\d]/g, '');
    const price = parseInt(priceStr, 10);
    return acc + (price * item.quantity);
  }, 0);

  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  return (
    <div className="min-h-screen bg-[#F9F6F1] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <span className="text-[10px] font-bold tracking-[0.3em] text-primary uppercase mb-2 inline-block">Shopping Bag</span>
          <h2 className="text-4xl font-display text-on-surface tracking-tight">Your Cart</h2>
        </motion.div>

        {items.length === 0 ? (
          <div className="bg-white p-16 text-center rounded-sm shadow-sm border border-black/5">
            <ShoppingBag size={48} className="mx-auto mb-6 text-on-surface/20" />
            <p className="text-xl text-tertiary font-light mb-8 italic">Your cart is feeling a bit light...</p>
            <button 
              onClick={onContinue}
              className="bg-primary text-on-primary py-4 px-12 text-xs font-bold tracking-widest uppercase hover:bg-primary-container hover:text-on-primary-container transition-all"
            >
              Start Exploring
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8">
              <div className="space-y-6">
                {items.map((item, idx) => (
                  <motion.div 
                    key={`${item.product.id}-${item.color}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-sm shadow-sm border border-black/5 group"
                  >
                    <div className="w-24 h-32 overflow-hidden bg-stone-100 flex-shrink-0">
                      <img src={item.variantImage || item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow text-center sm:text-left">
                      <h4 className="text-lg font-serif text-on-surface mb-1">{item.product.name}</h4>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-primary/60 mb-2">{item.color}</p>
                      <p className="text-sm font-semibold text-primary">{item.product.price}</p>
                    </div>
                    <div className="flex items-center gap-4 bg-stone-50 px-3 py-1 rounded-full border border-black/5">
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.color, -1)}
                        className="p-1 text-on-surface/40 hover:text-primary transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold min-w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.product.id, item.color, 1)}
                        className="p-1 text-on-surface/40 hover:text-primary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.product.id, item.color)}
                      className="p-3 text-on-surface/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))}
              </div>
              <button 
                onClick={onContinue}
                className="mt-8 text-[10px] font-bold tracking-widest uppercase text-on-surface/40 hover:text-primary transition-colors flex items-center gap-2"
              >
                <ArrowRight size={12} className="rotate-180" /> Continue Shopping
              </button>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white p-8 rounded-sm shadow-lg border border-black/5 sticky top-32">
                <h3 className="text-base font-bold tracking-widest uppercase text-on-surface/60 mb-8 border-b border-black/5 pb-4">
                  Summary
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-tertiary font-light">Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-tertiary font-light">GST (5%)</span>
                    <span className="font-semibold">₹{gst.toLocaleString()}</span>
                  </div>
                  <div className="h-[1px] bg-black/5 w-full my-4" />
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold tracking-widest uppercase">Total</span>
                    <span className="text-xl font-bold text-primary italic">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full bg-primary text-on-primary py-4 px-6 text-xs font-bold tracking-[0.3em] uppercase hover:bg-primary-container hover:text-on-primary-container transition-all shadow-xl active:scale-[0.98]">
                  Proceed to Checkout
                </button>
                <p className="text-[10px] text-center text-tertiary/40 font-light mt-6 italic">
                  Crafted with precision, delivered with grace.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FabricSelectorModal = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (fabric: string) => void }) => {
  const [showSoon, setShowSoon] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#F9F6F1] w-full max-w-2xl p-8 md:p-12 rounded-sm shadow-2xl overflow-hidden"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-on-surface/30 hover:text-primary transition-colors">
              <X size={24} />
            </button>

            <div className="text-center mb-12">
              <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase mb-3 block">Expert Consultation</span>
              <h2 className="text-3xl md:text-4xl font-display text-on-surface">Choose Your Fabric</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Malmal Option */}
              <motion.div 
                whileHover={{ y: -4 }}
                onClick={() => onSelect('malmal')}
                className="group cursor-pointer bg-white p-8 border border-black/5 hover:border-primary/20 hover:shadow-xl transition-all text-center rounded-sm"
              >
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/5 transition-colors">
                  <Menu size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold tracking-[0.2em] text-on-surface uppercase mb-2">Malmal</h3>
                <p className="text-xs text-tertiary font-light mb-6 opacity-60">Soft everyday cotton, breathable and graceful.</p>
                <span className="text-[9px] font-bold tracking-widest uppercase text-primary border-b border-primary/20 pb-1">Select Fabric</span>
              </motion.div>

              {/* Nazmeen Option */}
              <motion.div 
                whileHover={{ y: -4 }}
                onClick={() => onSelect('nazmeen')}
                className="group cursor-pointer bg-white p-8 border border-black/5 hover:border-primary/20 hover:shadow-xl transition-all text-center rounded-sm"
              >
                <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/5 transition-colors">
                  <Menu size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold tracking-[0.2em] text-on-surface uppercase mb-2">Nazmeen</h3>
                <p className="text-xs text-tertiary font-light mb-6 opacity-60">A touch of sheer luxury and delicate textures.</p>
                <span className="text-[9px] font-bold tracking-widest uppercase text-primary border-b border-primary/20 pb-1">Select Fabric</span>
              </motion.div>
            </div>
            
            <p className="text-center text-[10px] text-tertiary/40 italic mt-12">
              "Crafted with heritage, tailored for you."
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showChat, setShowChat] = useState(false);
  const [showFabricSelector, setShowFabricSelector] = useState(false);
  const [collectionScrollRequested, setCollectionScrollRequested] = useState(false);
  const [autoOpenProductId, setAutoOpenProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<{product: any, quantity: number, color: string, variantImage: string}[]>([]);

  const addToCart = (product: any, color: string, variantImage: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.color === color);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.color === color 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1, color, variantImage }];
    });
  };

  const removeFromCart = (productId: number, color: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.color === color)));
  };

  const updateQuantity = (productId: number, color: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.color === color) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    setCollectionScrollRequested(false);
  };

  const handleExplore = () => {
    setCollectionScrollRequested(true);
    setCurrentPage('collection');
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen selection:bg-primary-container selection:text-on-primary-container text-on-surface overflow-x-hidden">
      <Header onPageChange={handlePageChange} currentPage={currentPage} cartCount={cartCount} />
      <FabricSelectorModal 
        isOpen={showFabricSelector} 
        onClose={() => setShowFabricSelector(false)} 
        onSelect={(fabric) => {
          if (fabric === 'malmal') {
            setShowFabricSelector(false);
            setCurrentPage('collection');
            setAutoOpenProductId(101); // Mira Malmal Dupatta ID
          } else if (fabric === 'nazmeen') {
            setShowFabricSelector(false);
            setCurrentPage('collection');
            setAutoOpenProductId(109); // Mira Nazmeen Dupatta ID
          }
        }}
      />
      
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onExplore={handleExplore} onFindShade={() => setShowFabricSelector(true)} />
            <Spotlight />
            <ProductGrid />
            <Features />
          </>
        )}
        {currentPage === 'collection' && (
          <Collection 
            onAddToCart={addToCart} 
            scrollToProducts={collectionScrollRequested} 
            autoOpenProductId={autoOpenProductId}
            onModalClosed={() => setAutoOpenProductId(null)}
          />
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'cart' && (
          <CartPage 
            items={cart} 
            onUpdateQuantity={updateQuantity} 
            onRemove={removeFromCart} 
            onContinue={() => setCurrentPage('collection')} 
          />
        )}
      </main>

      <Footer />

      {/* FAB - WhatsApp/Chat */}
      <div className="fixed bottom-8 right-8 z-[60]">
        <AnimatePresence>
          {showChat && (
            <motion.div 
              initial={{ scale: 0, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0, opacity: 0, y: 20 }}
              className="bg-surface p-6 shadow-2xl border border-outline-variant mb-4 rounded-xl max-w-[280px]"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h6 className="font-serif italic text-primary text-lg">Chat with us</h6>
                  <p className="text-xs text-tertiary font-light">Our artisans are here to help.</p>
                </div>
                <button onClick={() => setShowChat(false)} className="text-tertiary/40 hover:text-primary">
                  <X size={16} />
                </button>
              </div>
              <button className="w-full py-3 bg-[#25D366] text-white rounded-lg flex items-center justify-center gap-2 font-bold text-xs uppercase tracking-widest hover:brightness-105 transition-all">
                <MessageCircle size={16} fill="white" /> WhatsApp
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowChat(!showChat)}
          className="w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:bg-primary-container hover:text-on-primary-container transition-all"
        >
          <MessageCircle size={24} />
        </motion.button>
      </div>
    </div>
  );
}
