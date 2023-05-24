import axios from "axios";
import { Button, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useAppContext } from "../../context";

const MakeAdmin = () => {
    const {
        loggedInUser: { email },
    } = useAppContext();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        if (email === "test@admin.com") {
            swal(
                "Permission restriction!",
                "As a test-admin, you don't have this permission.",
                "info"
            );
            return;
        }
        const loading = toast.loading("Adding...Please wait!");
        axios
            .post("https://gerez-server.herokuapp.com/addAdmin", data)
            .then((res) => {
                toast.dismiss(loading);
                if (res.data) {
                    swal(
                        "Successfully Added",
                        `${data.email} has been successfully added as an admin.`,
                        "success"
                    );
                    return;
                }
                swal("Failed!", "Something went wrong! Please try again.", "error", {
                    dangerMode: true,
                });
            })
            .catch(() => {
                toast.dismiss(loading);
                swal("Failed!", "Something went wrong! Please try again.", "error", {
                    dangerMode: true,
                });
            });
    };

    return (
        <section className="make-admin">
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-5 mx-md-5 mt-5 bg-white form-main d-flex justify-content-center">
                    <div className="py-md-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Row>
                            <Form.Group as={Col} xs="auto" style={{ width: "25rem" }}>
                                <Form.Control
                                    type="text"
                                    {...register("email", { required: true })}
                                    placeholder="Email Address"
                                />
                            </Form.Group>
                            <Form.Group as={Col} xs="auto">
                                <Button type="submit" className="btn-main">
                                    Add
                                </Button>
                            </Form.Group>
                        </Form.Row>
                    </div>
                </div>
            </Form>
        </section>
    );
};

export default MakeAdmin;
