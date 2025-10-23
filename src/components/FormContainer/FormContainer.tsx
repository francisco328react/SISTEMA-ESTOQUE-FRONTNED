interface FormContainerProps {
  children: React.ReactNode;
}

export const FormContainer: React.FC<FormContainerProps> = ({ children }) => (
  <div className="flex w-full md:w-1/2 items-center justify-center">
    <form className="bg-white shadow-md rounded-lg p-8 w-11/12 max-w-sm border border-gray-200">
      {children}
    </form>
  </div>
);
