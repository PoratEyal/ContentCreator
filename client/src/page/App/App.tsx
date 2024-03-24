import { getSubjects } from "../../service/openAiService";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import FormUser from "../../components/formUser/formUser";
import ChooseBigSubject from "../../components/chooseBigSubject/chooseBigSubject";
import ChooseTinySubject from "../../components/chooseTinySubject/chooseTinySubject";
import CreateImages from "../../components/createImages/createImages";
import HomePage from "../../components/homepage/homepage";
import Podcast from "../../components/podcast/podcadt"
import Provider from "../../context/Providers";

const App: React.FC = () => {

    const [subjects, setSubjects] = useState<any>();

    useEffect(() => {
      const getAndSetSubjects = async () => {
        const ans = await getSubjects();
        setSubjects(ans.subjectList);
      };

      getAndSetSubjects();
    }, []);

    return (
      <Provider>
        <Router>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}

            {subjects && <Route path="/chooseSubject" element={<ChooseBigSubject subjects={subjects} />} />}
            <Route path="/chooseTinySubject" element={<ChooseTinySubject/>} />

            {subjects && <Route path="/" element={<FormUser />} />}
            <Route path="/createImages" element={<CreateImages />} />

            <Route path="/podcast" element={<Podcast />} />
            
          </Routes>
        </Router>
      </Provider>
    );
  }

export default App;
