import app from './app';
import { getPort } from './utils/env';

app.listen(getPort(), () => {
  console.log(`Server started at http://localhost:${getPort()}`);
});
