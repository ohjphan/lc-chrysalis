"use client";

import * as React from "react";
import { ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { value: "", label: "Select country" },
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  { value: "AU", label: "Australia" },
  { value: "OTHER", label: "Other" },
];

function sectionTitleClass() {
  return "font-page-h2 text-heading dark:text-foreground";
}

function selectClassName() {
  return cn(
    "flex h-10 w-full rounded-md border-app border-border-subtle bg-field-bg px-3 py-2 text-base font-normal text-foreground",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-subtle focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  );
}

export function OrganizationSettingsView() {
  const [orgName, setOrgName] = React.useState("Magic School");
  const [urlHost, setUrlHost] = React.useState("magicschool.com");
  const [description, setDescription] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [hasLogo, setHasLogo] = React.useState(false);

  const [savedProfile, setSavedProfile] = React.useState({
    orgName: "Magic School",
    urlHost: "magicschool.com",
    description: "",
    phone: "",
    hasLogo: false,
  });

  const [contact, setContact] = React.useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const [savedContact, setSavedContact] = React.useState({ ...contact });

  const [deleteOpen, setDeleteOpen] = React.useState(false);

  const profileDirty =
    orgName !== savedProfile.orgName ||
    urlHost !== savedProfile.urlHost ||
    description !== savedProfile.description ||
    phone !== savedProfile.phone ||
    hasLogo !== savedProfile.hasLogo;

  const contactDirty =
    contact.addressLine1 !== savedContact.addressLine1 ||
    contact.addressLine2 !== savedContact.addressLine2 ||
    contact.city !== savedContact.city ||
    contact.state !== savedContact.state ||
    contact.postalCode !== savedContact.postalCode ||
    contact.country !== savedContact.country;

  function saveProfile() {
    setSavedProfile({
      orgName,
      urlHost,
      description,
      phone,
      hasLogo,
    });
  }

  function saveContact() {
    setSavedContact({ ...contact });
  }

  function confirmDelete() {
    setDeleteOpen(false);
    const emptyProfile = {
      orgName: "",
      urlHost: "",
      description: "",
      phone: "",
      hasLogo: false,
    };
    const emptyContact = {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    };
    setOrgName(emptyProfile.orgName);
    setUrlHost(emptyProfile.urlHost);
    setDescription(emptyProfile.description);
    setPhone(emptyProfile.phone);
    setHasLogo(emptyProfile.hasLogo);
    setSavedProfile(emptyProfile);
    setContact(emptyContact);
    setSavedContact(emptyContact);
  }

  return (
    <div className="space-y-10">
      <section className="space-y-6">
        <h2 className={sectionTitleClass()}>Organization profile</h2>
        <div className="grid gap-8 lg:grid-cols-[1fr_min(240px,100%)] lg:items-start">
          <div className="space-y-6">
            <Field id="org-name" label="Organization name">
              <Input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                autoComplete="organization"
              />
            </Field>
            <div className="stack-field">
              <label
                htmlFor="org-url"
                className="text-base font-medium text-[#242423] dark:text-foreground"
              >
                Organization URL
              </label>
              <div className="flex rounded-md border-app border-border-subtle bg-field-bg focus-within:ring-2 focus-within:ring-border-subtle focus-within:ring-offset-2 focus-within:ring-offset-background">
                <span className="flex shrink-0 items-center border-app-r border-border-subtle px-3 text-sm text-muted-foreground">
                  https://
                </span>
                <Input
                  id="org-url"
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  value={urlHost}
                  onChange={(e) => setUrlHost(e.target.value)}
                  placeholder="yoursite.com"
                  autoComplete="url"
                />
              </div>
            </div>
            <Field id="org-desc" label="Short description">
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of your organization."
                className="min-h-[100px]"
              />
            </Field>
            <Field id="org-phone" label="Contact phone number" optional>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 …"
              />
            </Field>
          </div>
          <div className="stack-field">
            <span className="text-base font-medium text-[#242423] dark:text-foreground">
              Organization logo
            </span>
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-3 rounded-lg border-app border-dashed border-border-subtle bg-field-bg/50 px-4 py-8 text-center",
              )}
            >
              <ImageUp className="size-8 text-muted-foreground" aria-hidden />
              <p className="text-sm text-muted-foreground">
                JPG, PNG, or GIF. Max 5MB
              </p>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setHasLogo(true)}
              >
                Upload photo
              </Button>
              {hasLogo ? (
                <button
                  type="button"
                  className="text-sm font-normal text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  onClick={() => setHasLogo(false)}
                >
                  Remove photo
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <Button
          type="button"
          variant="primary"
          disabled={!profileDirty}
          onClick={saveProfile}
        >
          Save
        </Button>
      </section>

      <hr className="border-app border-border-subtle" />

      <section className="space-y-6">
        <h2 className={sectionTitleClass()}>Organization contact</h2>
        <div className="grid max-w-2xl gap-6">
          <Field id="addr-1" label="Primary business address">
            <Input
              value={contact.addressLine1}
              onChange={(e) =>
                setContact((c) => ({ ...c, addressLine1: e.target.value }))
              }
              placeholder="Street address"
            />
          </Field>
          <Field id="addr-2" label="Apt, suite, unit, etc." optional>
            <Input
              value={contact.addressLine2}
              onChange={(e) =>
                setContact((c) => ({ ...c, addressLine2: e.target.value }))
              }
            />
          </Field>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="city" label="City">
              <Input
                value={contact.city}
                onChange={(e) =>
                  setContact((c) => ({ ...c, city: e.target.value }))
                }
              />
            </Field>
            <Field id="state" label="State / Province">
              <Input
                value={contact.state}
                onChange={(e) =>
                  setContact((c) => ({ ...c, state: e.target.value }))
                }
              />
            </Field>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field id="postal" label="Postal code">
              <Input
                value={contact.postalCode}
                onChange={(e) =>
                  setContact((c) => ({ ...c, postalCode: e.target.value }))
                }
              />
            </Field>
            <Field id="country" label="Country">
              <select
                id="country"
                className={selectClassName()}
                value={contact.country}
                onChange={(e) =>
                  setContact((c) => ({ ...c, country: e.target.value }))
                }
              >
                {COUNTRIES.map((c) => (
                  <option key={c.value || "empty"} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </div>
        <Button
          type="button"
          variant="primary"
          disabled={!contactDirty}
          onClick={saveContact}
        >
          Save
        </Button>
      </section>

      <hr className="border-app border-border-subtle" />

      <section className="space-y-4">
        <h2 className={sectionTitleClass()}>Danger zone</h2>
        <p className="max-w-xl text-base text-muted-foreground">
          Permanently delete this organization and all associated data. This
          cannot be undone.
        </p>
        <Button
          type="button"
          variant="destructive"
          className="w-full max-w-md sm:w-auto"
          onClick={() => setDeleteOpen(true)}
        >
          Delete organization
        </Button>
      </section>

      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete organization</DialogTitle>
            <DialogDescription>
              This will remove the organization from your workspace in this
              demo. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-border-subtle dark:border-zinc-700/80">
            <Button
              type="button"
              variant="secondary"
              className="dark:border-zinc-600 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => setDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={confirmDelete}
            >
              Delete organization
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
