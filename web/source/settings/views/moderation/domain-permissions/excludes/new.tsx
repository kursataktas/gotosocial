/*
	GoToSocial
	Copyright (C) GoToSocial Authors admin@gotosocial.org
	SPDX-License-Identifier: AGPL-3.0-or-later

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

import React from "react";
import useFormSubmit from "../../../../lib/form/submit";
import { useCreateDomainPermissionExcludeMutation } from "../../../../lib/query/admin/domain-permissions/excludes";
import { useTextInput } from "../../../../lib/form";
import { formDomainValidator } from "../../../../lib/util/formvalidators";
import MutationButton from "../../../../components/form/mutation-button";
import { TextArea, TextInput } from "../../../../components/form/inputs";
import { useLocation } from "wouter";

export default function DomainPermissionExcludeNew() {
	const [ _location, setLocation ] = useLocation();
	
	const form = {
		domain: useTextInput("domain", {
			validator: formDomainValidator,
		}),
		private_comment: useTextInput("private_comment"),
	};
		
	const [formSubmit, result] = useFormSubmit(
		form,
		useCreateDomainPermissionExcludeMutation(),
		{
			changedOnly: false,
			onFinish: (res) => {
				if (res.data) {
					// Creation successful,
					// redirect to excludes overview.
					setLocation(`/excludes/search`);
				}
			},
		});

	return (
		<form
			onSubmit={formSubmit}
			// Prevent password managers
			// trying to fill in fields.
			autoComplete="off"
		>
			<div className="form-section-docs">
				<h2>New Domain Permission Exclude</h2>
				<p>
					You can use the form below to create a new domain permission exclude.
					<br/>
					Domain permission excludes are domain block or domain allow entries that are not yet in force.
					<br/>
					You can choose to accept or remove a exclude.
				</p>
			</div>

			<TextInput
				field={form.domain}
				label={`Domain (without "https://" prefix)`}
				placeholder="example.org"
				autoCapitalize="none"
				spellCheck="false"
			/>

			<TextArea
				field={form.private_comment}
				label={"Private comment"}
				placeholder="This domain is like unto a clown car full of clowns, I suggest we block it forthwith."
				autoCapitalize="sentences"
				rows={3}
			/>

			<MutationButton
				label="Save"
				result={result}
				disabled={!form.domain.value || !form.domain.valid}
			/>
		</form>
	);
}
