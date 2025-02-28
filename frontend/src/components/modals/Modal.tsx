import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as React from "react";
interface Props {
    children: React.ReactNode,
    data: object
}
export default function Modal({ data, children }: Props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Подтвердите обновление/добавление данных</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {JSON.stringify(data, null, 2)}
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
