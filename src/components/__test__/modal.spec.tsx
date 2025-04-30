import { Modal } from "@/components/modal";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Modal", () => {
  it("renders the Modal and its children", () => {
    render(
      <Modal>
        <div>Modal content</div>
      </Modal>,
    );
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("renders the Header and handles close", () => {
    const handleClose = vi.fn();

    render(<Modal.Header onClose={handleClose} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleClose).toHaveBeenCalled();
  });

  it("renders the Title", () => {
    render(<Modal.Title title="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders the Warning with title and subtitle", () => {
    render(
      <Modal.Warning
        title="Warning Title"
        subtitle="This is a warning subtitle"
      />,
    );
    expect(screen.getByText("Warning Title")).toBeInTheDocument();
    expect(screen.getByText("This is a warning subtitle")).toBeInTheDocument();
  });

  it("renders the Input with no error styling", () => {
    render(<Modal.Input error={false} />);
    const input = screen.getByPlaceholderText("Nome");
    expect(input).toBeInTheDocument();
    expect(input).not.toHaveAttribute("data-error", "true");
  });

  it("renders the Input with error styling", () => {
    render(<Modal.Input error={true} />);
    const input = screen.getByPlaceholderText("Nome");
    expect(input).toHaveAttribute("data-error", "true");
  });

  it("renders the Footer and its children", () => {
    render(
      <Modal.Footer>
        <span>Footer content</span>
      </Modal.Footer>,
    );
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("renders and handles click on SuccessButton", () => {
    const onClick = vi.fn();
    render(
      <Modal.SuccessButton onClick={onClick}>Confirm</Modal.SuccessButton>,
    );
    const button = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("renders and handles click on WarningButton", () => {
    const onClick = vi.fn();
    render(<Modal.WarningButton onClick={onClick}>Delete</Modal.WarningButton>);
    const button = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it("renders and handles click on CancelButton", () => {
    const onClick = vi.fn();
    render(<Modal.CancelButton onClick={onClick}>Cancel</Modal.CancelButton>);
    const button = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
