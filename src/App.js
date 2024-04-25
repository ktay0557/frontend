import styles from "./App.module.css";
import NavBar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AdvertCreateForm from "./pages/adverts/AdvertCreateForm";
import AdvertPage from "./pages/adverts/AdvertPage";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";
import AdvertEditForm from "./pages/adverts/AdvertEditForm";
import AdoptionCreateForm from "./pages/adoptions/AdoptionCreateForm";
import AdoptionPage from "./pages/adoptions/AdoptionPage";
import AdoptionsPage from "./pages/adoptions/AdoptionsPage";

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";

  return (
    <div className={styles.App}>
      <NavBar />
      <Container className={styles.Main}>
        <ToastContainer />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <AdvertsPage message="Hmm... No results. Try again." />
            )}
          />
          <Route
            exact
            path="/liked"
            render={() => (
              <AdvertsPage
                message="Hmm... No results. Adjust search or like a kitty."
                filter={`likes__owner__profile=${profile_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          <Route
            exact
            path="/adoptions"
            render={() => (
              <AdoptionsPage
                message="Hmm... No results. Plase adjust search."
                filter={`owner__profile=${profile_id}&`}
              />
            )}
          />
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/adverts/create" render={() => <AdvertCreateForm />} />
          <Route exact path="/adverts/:id" render={() => <AdvertPage />} />
          <Route exact path="/adverts/:id/edit" render={() => <AdvertEditForm />} />
          <Route exact path="/adoptions/create" render={() => <AdoptionCreateForm />} />
          <Route exact path="/adoptions/:id" render={() => <AdoptionPage />} />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;