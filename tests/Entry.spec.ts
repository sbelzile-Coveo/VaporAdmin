import { configure } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Specs', () => {
    const div = document.createElement("div");
    div.id = "App";
    div.classList.add("coveo-styleguide");

    document.body.appendChild(div);

    const req = require.context('./', true, /spec\.ts(x?)$/);
    req.keys().forEach(key => req(key));
});
