// ItineraryForm.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    TOUR_TYPES,
    PREFERRED_ACTIVITIES,
    MODES_OF_TRANSPORT,
    ACTIVITY_LEVELS,
    TOP_CURRENCIES,
} from "./constants";
import type { ItineraryInput, ItineraryResponse } from "./types";

interface ItineraryFormProps {
    onSuccess: (data: ItineraryResponse) => void;
}

export function ItineraryForm({ onSuccess }: ItineraryFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm({
        defaultValues: {
            destination: "",
            days: 1,
            tourType: "",
            otherTourType: "",
            preferredActivities: [] as string[],
            budget: "",
            currency: "",
            modeOfTransport: "",
            otherTransport: "",
            activityLevel: "",
            customNote: "",
        },
    });

    const onSubmit = async (values: any) => {
        setIsLoading(true);
        setError(null);

        try {
            const payload: ItineraryInput = {
                destination: values.destination,
                days: Number(values.days),
                tourType:
                    values.tourType === "Other"
                        ? values.otherTourType
                        : values.tourType,
                preferredActivities: values.preferredActivities,
                budget: `${values.budget} ${values.currency}`,
                modeOfTransport:
                    values.modeOfTransport === "Other"
                        ? values.otherTransport
                        : values.modeOfTransport,
                activityLevel: values.activityLevel,
                customNote: values.customNote || "",
            };

            const response = await axios.post<ItineraryResponse>(
                `${import.meta.env.VITE_SERVER_URL}/api/itinerary/generate`,
                payload,
                {
                    withCredentials: true,
                }
            );

            onSuccess(response.data);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to generate itinerary"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-3xl mx-auto mt-20 p-7">
            <CardContent className="pt-6">
                {error && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="destination"
                            rules={{ required: "Destination is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Destination</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter destination"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="days"
                            rules={{
                                required: "Number of days is required",
                                min: { value: 1, message: "Minimum 1 day" },
                                max: { value: 30, message: "Maximum 30 days" },
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Number of Days</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            min={1}
                                            max={30}
                                            {...field}
                                            onChange={(e) =>
                                                field.onChange(
                                                    parseInt(e.target.value)
                                                )
                                            }
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Maximum 30 days
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="tourType"
                            rules={{ required: "Tour type is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tour Type</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-2 gap-4"
                                        >
                                            {TOUR_TYPES.map((type) => (
                                                <FormItem
                                                    key={type}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={type}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {type}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.watch("tourType") === "Other" && (
                            <FormField
                                control={form.control}
                                name="otherTourType"
                                rules={{ required: "Please specify tour type" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Specify Tour Type</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="preferredActivities"
                            rules={{ required: "Select at least one activity" }}
                            render={() => (
                                <FormItem>
                                    <FormLabel>Preferred Activities</FormLabel>
                                    <div className="grid grid-cols-2 gap-4">
                                        {PREFERRED_ACTIVITIES.map(
                                            (activity) => (
                                                <FormField
                                                    key={activity}
                                                    control={form.control}
                                                    name="preferredActivities"
                                                    render={({ field }) => (
                                                        <FormItem
                                                            key={activity}
                                                            className="flex items-center space-x-3"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(
                                                                        activity
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) => {
                                                                        const updatedValue =
                                                                            checked
                                                                                ? [
                                                                                      ...field.value,
                                                                                      activity,
                                                                                  ]
                                                                                : field.value?.filter(
                                                                                      (
                                                                                          value
                                                                                      ) =>
                                                                                          value !==
                                                                                          activity
                                                                                  );
                                                                        field.onChange(
                                                                            updatedValue
                                                                        );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {activity}
                                                            </FormLabel>
                                                        </FormItem>
                                                    )}
                                                />
                                            )
                                        )}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="budget"
                                rules={{ required: "Budget is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Budget</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="currency"
                                rules={{ required: "Currency is required" }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Currency</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select currency" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {TOP_CURRENCIES.map(
                                                    (currency) => (
                                                        <SelectItem
                                                            key={currency}
                                                            value={currency}
                                                        >
                                                            {currency}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="modeOfTransport"
                            rules={{
                                required: "Mode of transport is required",
                            }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mode of Transport</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            className="grid grid-cols-2 gap-4"
                                        >
                                            {MODES_OF_TRANSPORT.map((mode) => (
                                                <FormItem
                                                    key={mode}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={mode}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {mode}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.watch("modeOfTransport") === "Other" && (
                            <FormField
                                control={form.control}
                                name="otherTransport"
                                rules={{
                                    required: "Please specify transport mode",
                                }}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Specify Transport Mode
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <FormField
                            control={form.control}
                            name="activityLevel"
                            rules={{ required: "Activity level is required" }}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activity Level</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select activity level" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {ACTIVITY_LEVELS.map((level) => (
                                                <SelectItem
                                                    key={level}
                                                    value={level}
                                                >
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="customNote"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Custom Notes</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Any special requirements or preferences..."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating Itinerary...
                                </>
                            ) : (
                                "Generate Itinerary"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
