import { SandwichMenu, SandwichMenuContextProvider } from '@/features/SandwichMenu';
import { Main } from '@/pages/main';
import { Route, Switch } from 'wouter';
import { ENavigationPath } from '@/shared/types/types.ts';
import { Service } from '@/pages/service';
import { QuestionsFormContextProvider } from '@/features/QuestionsForm/context/QuestionsFormContext.tsx';
import { QuestionsForm } from '@/features/QuestionsForm/components/QuestionsForm.tsx';

function App() {
  return (
    <>
      <SandwichMenuContextProvider>
        <QuestionsFormContextProvider>
          <QuestionsForm>
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
          </QuestionsForm>
        </QuestionsFormContextProvider>
      </SandwichMenuContextProvider>
    </>
  );
}

export default App;
