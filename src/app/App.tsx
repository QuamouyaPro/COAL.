import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return (
    <>
      {/* Accessibilité : accès direct au contenu au clavier */}
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <RouterProvider router={router} />
      {/* Texture « charbon » globale — subtile, non bloquante */}
      <div className="grain-overlay" aria-hidden="true" />
    </>
  );
}
