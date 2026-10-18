from tkinter import *
from tkinter import messagebox

root = Tk()
root.geometry("1980x1080")
root.title("Login & Sign Up")
root.config(bg="white")

def clear_window():
    for widget in root.winfo_children():
        widget.destroy()

def check_login(username, password):
    try:
        with open("user_details.txt", 'r') as f:
            for line in f:
                stored = line.strip().split(',')
                if stored[0] == username and stored[1] == password:
                    messagebox.showinfo("Success", f"Welcome {username}!")
                    return
        messagebox.showerror("Error", "Invalid username or password")
    except FileNotFoundError:
        messagebox.showerror("Error", "No users found")

def register_user(username, password, email):
    if username and password and email:
        with open("user_details.txt", 'a') as f:
            f.write(f"{username},{password},{email}\n")
        messagebox.showinfo("Success", "Registration Successful!")
        show_login_page()
    else:
        messagebox.showerror("Error", "Please fill all details")

def show_login_page():
    clear_window()
    main_frame = Frame(root, bg="Lavender")
    main_frame.pack(pady=100)

    Label(main_frame, text="LOGIN", bg="Lavender", font=("Arial", 24, 'bold')).pack(pady=20)

    user_frame = Frame(main_frame, bg='Lavender')
    user_frame.pack(pady=10)
    Label(user_frame, text="Username", bg="Lavender", font=("Arial", 16, 'bold')).pack(side=LEFT, padx=10)
    user_entry = Entry(user_frame, font=("Arial", 16))
    user_entry.pack(padx=10)

    pass_frame = Frame(main_frame, bg="Lavender")
    pass_frame.pack(pady=10)
    Label(pass_frame, text="Password", bg="Lavender", font=("Arial", 16, 'bold')).pack(side=LEFT, padx=10)
    pass_entry = Entry(pass_frame, font=("Arial", 16), show="*")
    pass_entry.pack(padx=10)

    btn_frame = Frame(main_frame, bg="Lavender")
    btn_frame.pack(pady=20)
    Button(btn_frame, text="Login", fg='white', bg="powderblue", font=("Arial", 16, 'bold'),
           command=lambda: check_login(user_entry.get(), pass_entry.get())).pack(side=LEFT, padx=10)
    Button(btn_frame, text="Sign Up", fg='white', bg="salmon", font=("Arial", 16, 'bold'),
           command=show_signup_page).pack(side=LEFT, padx=10)

def show_signup_page():
    clear_window()
    main_frame = Frame(root, bg="Lavender", padx=50, pady=30)
    main_frame.pack(pady=80)

    Label(main_frame, text="SIGN UP", bg="Lavender", font=("Arial", 24, 'bold')).pack(pady=20)

    user_frame = Frame(main_frame, bg='Lavender')
    user_frame.pack(pady=10)
    Label(user_frame, text="Username", bg="Lavender", font=("Arial", 14, 'bold'), width=15, anchor='w').pack(side=LEFT)
    user_entry = Entry(user_frame, font=("Arial", 14), width=25)
    user_entry.pack(padx=20)

    email_frame = Frame(main_frame, bg='Lavender')
    email_frame.pack(pady=10)
    Label(email_frame, text="Email", bg="Lavender", font=("Arial", 14, 'bold'), width=15, anchor='w').pack(side=LEFT)
    email_entry = Entry(email_frame, font=("Arial", 14), width=25)
    email_entry.pack(padx=20)

    pass_frame = Frame(main_frame, bg="Lavender")
    pass_frame.pack(pady=10)
    Label(pass_frame, text="Password", bg="Lavender", font=("Arial", 14, 'bold'), width=15, anchor='w').pack(side=LEFT)
    pass_entry = Entry(pass_frame, font=("Arial", 14), width=25, show="*")
    pass_entry.pack(padx=20)

    btn_frame = Frame(main_frame, bg="Lavender")
    btn_frame.pack(pady=20)
    Button(btn_frame, text="Sign Up", fg='white', bg="salmon", font=("Arial", 14, 'bold'),
           command=lambda: register_user(user_entry.get(), pass_entry.get(), email_entry.get())).pack(side=LEFT, padx=10)
    Button(btn_frame, text="Back", fg='white', bg="gray", font=("Arial", 14, 'bold'),
           command=show_login_page).pack(side=LEFT, padx=10)

show_login_page()
root.mainloop()