-- Allow admins to update registrations (e.g. payment status)
CREATE POLICY "Admins can update registrations"
ON public.registrations
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));