import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp, Login, Dashboard} from './pages';
 import ProtectedRoute from './helper';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
         <Route path="/login" element={<Login />} />
         <Route path='/' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        {/* <Route path='/contententry/:id/:name' element={<ProtectedRoute><ContentEntry /></ProtectedRoute>} />
        <Route path="/error/:errorCode" element={<Error />} />
        <Route path="*" element={<PageNotFound />} />   */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;