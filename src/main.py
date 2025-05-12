import tkinter as tk
from math_exercise_interface import MathExerciseInterface # type: ignore

def main():
    root = tk.Tk()
    app = MathExerciseInterface(master=root)
    app.pack()  # This works because MathExerciseInterface inherits from tk.Frame
    root.mainloop()

if __name__ == "__main__":
    main()