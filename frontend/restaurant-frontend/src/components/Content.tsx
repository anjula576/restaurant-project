import React from "react";

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main className="p-3">
            {children}
        </main>
    );
};

export default Content;
