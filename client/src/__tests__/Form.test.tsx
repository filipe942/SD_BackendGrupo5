import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../components/Form";
import "@testing-library/jest-dom";

describe("Form component", () => {
  beforeAll(() => {
    window.alert = () => {};
  });

  const setup = () => {
    const utils = render(<Form />);
    const localInput = utils.getByLabelText("Local:") as HTMLInputElement;
    const dateInput = utils.getByLabelText("Date") as HTMLInputElement;
    const timeInput = utils.getByLabelText("Time:") as HTMLInputElement;
    const participantsInput = utils.getByLabelText(
      "Number of Participants:"
    ) as HTMLInputElement;
    return {
      localInput,
      dateInput,
      timeInput,
      participantsInput,
      ...utils,
    };
  };

  test("Renders form inputs and allows input entry?", () => {
    const { localInput, dateInput, timeInput, participantsInput } = setup();

    fireEvent.change(localInput, { target: { value: "Community Center" } });
    expect(localInput.value).toBe("Community Center");

    fireEvent.change(dateInput, { target: { value: "2023-11-05" } });
    expect(dateInput.value).toBe("2023-11-05");

    fireEvent.change(timeInput, { target: { value: "14:00" } });
    expect(timeInput.value).toBe("14:00");

    fireEvent.change(participantsInput, { target: { value: "25" } });
    expect(participantsInput.value).toBe("25");
  });

  test("Validates form fields before submission?", () => {
    const { localInput, dateInput, timeInput, participantsInput } = setup();

    fireEvent.change(localInput, { target: { value: "Community Center" } });
    fireEvent.change(dateInput, { target: { value: "2023-11-05" } });
    fireEvent.change(timeInput, { target: { value: "14:00" } });
    fireEvent.change(participantsInput, { target: { value: "25" } });
    fireEvent.click(screen.getByText("Submit"));
  });
});
