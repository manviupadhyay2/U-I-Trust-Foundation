import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Topbar from './LearningCircleLeader/scenes/global/Topbar';
import Sidebar from './LearningCircleLeader/scenes/global/Sidebar';
import Dashboard from './LearningCircleLeader/scenes/dashboard';
import Team from './LearningCircleLeader/scenes/team';
import Contacts from './LearningCircleLeader/scenes/contacts';
import Form from './LearningCircleLeader/scenes/form';
import Line from './LearningCircleLeader/scenes/line';
import Materials from './LearningCircleLeader/scenes/materials';  // Import the Materials component

import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';

function ChapterLeader() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app flex relative h-full w-full">
          <Sidebar isSidebar={isSidebar} />
          <main className="content h-full w-full">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes >
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/form" element={<Form />} />
                
              <Route path="/line" element={<Line />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  
  );
} 

export default ChapterLeader;