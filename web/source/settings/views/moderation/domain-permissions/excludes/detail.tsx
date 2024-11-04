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
import { useParams } from "wouter";
import Loading from "../../../../components/loading";
import { useBaseUrl } from "../../../../lib/navigation/util";
import BackButton from "../../../../components/back-button";
import { Error as ErrorC } from "../../../../components/error";
import UsernameLozenge from "../../../../components/username-lozenge";
import { useGetDomainPermissionExcludeQuery } from "../../../../lib/query/admin/domain-permissions/excludes";

export default function DomainPermissionExcludeDetail() {
	const baseUrl = useBaseUrl();
	const backLocation: string = history.state?.backLocation ?? `~${baseUrl}`;
	const params = useParams();

	let id = params.permExcludeId as string | undefined;
	if (!id) {
		throw "no perm ID";
	}

	const {
		data: permExclude,
		isLoading,
		isFetching,
		isError,
		error,
	} = useGetDomainPermissionExcludeQuery(id);

	if (isLoading || isFetching) {
		return <Loading />;
	} else if (isError) {
		return <ErrorC error={error} />;
	} else if (permExclude === undefined) {
		return <ErrorC error={new Error("permission exclude was undefined")} />;
	}

	const created = permExclude.created_at ? new Date(permExclude.created_at).toDateString(): "unknown";
	const domain = permExclude.domain;
	const permType = permExclude.permission_type;
	if (!permType) {
		return <ErrorC error={new Error("permission_type was undefined")} />;
	}
	const publicComment = permExclude.public_comment ?? "[none]";
	const privateComment = permExclude.private_comment ?? "[none]";
	const subscriptionID = permExclude.subscription_id ?? "[none]";

	return (
		<div className="domain-permission-exclude-details">
			<h1><BackButton to={backLocation} /> Domain Permission Exclude Detail</h1>
			<dl className="info-list">
				<div className="info-list-entry">
					<dt>Created</dt>
					<dd><time dateTime={permExclude.created_at}>{created}</time></dd>
				</div>
				<div className="info-list-entry">
					<dt>Created By</dt>
					<dd>
						<UsernameLozenge
							account={permExclude.created_by}
							linkTo={`~/settings/moderation/accounts/${permExclude.created_by}`}
							backLocation={`~${location}`}
						/>
					</dd>
				</div>
				<div className="info-list-entry">
					<dt>Domain</dt>
					<dd>{domain}</dd>
				</div>
				<div className="info-list-entry">
					<dt>Permission type</dt>
					<dd className={`permission-type ${permType}`}>
						<i
							aria-hidden={true}
							className={`fa fa-${permType === "allow" ? "check" : "close"}`}
						></i>
						{permType}
					</dd>
				</div>
				<div className="info-list-entry">
					<dt>Private comment</dt>
					<dd>{privateComment}</dd>
				</div>
				<div className="info-list-entry">
					<dt>Public comment</dt>
					<dd>{publicComment}</dd>
				</div>
				<div className="info-list-entry">
					<dt>Subscription ID</dt>
					<dd>{subscriptionID}</dd>
				</div>
			</dl>
			<HandleExclude
				id={id}
				backLocation={backLocation}
			/> 
		</div>
	);
}

function HandleExclude({ id, backLocation }: { id: string, backLocation: string }) {
	return <></>;
}
