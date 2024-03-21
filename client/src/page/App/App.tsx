import { getSubjects } from "../../service/openAiService";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import FormUser from "../../components/formUser/formUser";
import ChooseBigSubject from "../../components/chooseBigSubject/chooseBigSubject";
import CreateImages from "../../components/createImages/createImages";
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
            {subjects && <Route path="/" element={<ChooseBigSubject subjects={subjects} />} />}
            <Route path="/userForm" element={<FormUser />} />
            <Route path="/createImages" element={<CreateImages />} />
          </Routes>
        </Router>
      </Provider>
    );
  }

export default App;
