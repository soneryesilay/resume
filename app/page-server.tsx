// Server Component
import { metadata } from './page-metadata';
import Home from './page';

// Server Component'ten metadata dışa aktarılıyor
export { metadata };

// Client Component'i render et
export default function Page() {
  return <Home />;
}