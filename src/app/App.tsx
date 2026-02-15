import { SandwichMenu, SandwichMenuContextProvider } from '@/features/SandwichMenu';
import { Main } from '@/pages/main';
import { Route, Switch } from 'wouter';
import { ENavigationPath } from '@/shared/types/types.ts';
import { Service } from '@/pages/service';

function App() {
  return (
    <>
      <SandwichMenuContextProvider>
        <SandwichMenu>
          <Switch>
            <Route path={ENavigationPath.MAIN} component={Main} />
            <Route path={'/dachny-proekt'} component={Main} />
          </Switch>
          <Switch>
            <Route path={ENavigationPath.SERVICE} component={Service} />
            <Route
              path={'/dachny-proekt/' + ENavigationPath.SERVICE}
              component={Service}
            />
          </Switch>
        </SandwichMenu>
      </SandwichMenuContextProvider>
    </>
  );
}

export default App;
