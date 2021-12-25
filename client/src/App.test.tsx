import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders all buttons", async () => {
    render(<App />);
    const linkElement = await screen.findAllByRole("button");
    expect(linkElement.length).toBe(2);
});

test("renders all textboxes", async () => {
    render(<App />);
    const linkElement = await screen.findAllByRole("textbox");
    expect(linkElement.length).toBe(5);
});
