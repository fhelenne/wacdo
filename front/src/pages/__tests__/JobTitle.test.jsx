import {act, fireEvent, screen} from '@testing-library/react';
import ReactDOMClient from 'react-dom/client';

import App from "../../App.jsx";
import {AuthProvider} from "../../contexts/AuthContext.jsx";

localStorage.setItem('jwt', "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3NTczMjcyMTYsImV4cCI6MTc2MDkyNzIxNiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfRU1QTE9ZRUUiLCJST0xFX1VTRVIiXSwidXNlcm5hbWUiOiJhZG1pbkB3YWNkby5sb2NhbCIsInVzZXJfaWQiOjEzfQ.CTttEmW5_Ufk1RTHNBobvNxjpUe1ScevOC04dFD10wmC58eG_MefZuCj8amU4qQAA6k2FyVPdcsN6k3IezH8x0QCrChELkfnLYqQ8CZSD0QZIxaD-7X9eIZIJd3tPX2QOJ-KnD4CQiILxmKt2-Imjh6T6rV4bgBXrUzV571QJBlMs6kn2pdo1mhm5hkWJqnftiI6XCIlYZg22as_7Bm0XYIocKgryE6s5a9lEp7yBY5YcNHr2apcfZZH207iwf5VowxiQngXHFuxeaM0QZav9V8jJkfaCu-57M8qbwACOf6IDL2R44WnPvabFfwAgLIHlcNWVQCK0oh4rT1P_hWP-A")

it('JobTitle Component', async () => {

    const container = document.createElement('div');
    document.body.appendChild(container);
    await act(() => {
        ReactDOMClient.createRoot(container).render(<AuthProvider><App/></AuthProvider>);
    });

    await act(async () => {
        fireEvent.click(screen.getByText('Postes').parentNode);
    });
    const title = await screen.findByText('Gestion des Postes');
    expect(title).toBeDefined();

    const manager = await screen.findByText('manager');
    const cook = await screen.findByText('cook');
    expect(manager).toBeDefined();
    expect(cook).toBeDefined();
});