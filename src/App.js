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
import About from "./pages/about/About";
import ProfilePage from "./pages/profiles/ProfilePage";
import UsernameForm from "./pages/profiles/UsernameForm";
import UserPasswordForm from "./pages/profiles/UserPasswordForm";
import ProfileEditForm from "./pages/profiles/ProfileEditForm";

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
          <Route exact path="/about" render={() => <About />} />
          <Route exact path="/profiles/:id" render={() => <ProfilePage />} />
          <Route
            exact
            path="/profiles/:id/edit/username"
            render={() => <UsernameForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit/password"
            render={() => <UserPasswordForm />}
          />
          <Route
            exact
            path="/profiles/:id/edit"
            render={() => <ProfileEditForm />}
          />
          <Route render={() => <p>Page Not Found!</p>} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;