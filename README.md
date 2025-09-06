# My React Material-UI App

This project is a simple React application that utilizes Material-UI for its UI components. It demonstrates how to create a functional component using Material-UI's Button and how to apply a custom theme throughout the application.

## Getting Started

To get started with this project, follow the instructions below:

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/my-react-materialui-app.git
   ```

2. Navigate into the project directory:

   ```
   cd my-react-materialui-app
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm start
```

This will launch the application in your default web browser at `http://localhost:3000`.

### Building for Production

To create a production build of the application, run:

```
npm run build
```

This will generate a `build` folder containing the optimized application.

## Usage

The main component of the application is `App.tsx`, which renders the `MaterialButton` component. You can customize the button by passing different props for `variant`, `color`, and `onClick` handler.

### Example

Here is an example of how to use the `MaterialButton` component:

```tsx
<MaterialButton 
  variant="contained" 
  color="primary" 
  onClick={() => alert('Button clicked!')}
>
  Click Me
</MaterialButton>
```

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.