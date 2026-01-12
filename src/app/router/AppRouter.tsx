import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from '@pages/home';
import { DetailPage } from '@pages/detail';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:lat/:lon" element={<DetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
